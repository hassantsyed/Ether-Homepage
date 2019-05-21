App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    //should initialize empty image boxes here
    var curRow = 0;
    for (var r = 0; r < 10; r++) {
      //create row
      row = '<div id="' + r + '" ></div>';
      //$("#container").append(row2)
      $("#container").append(row);
      for (var c = 0; c < 10; c++) {
        //create col
        id = r + "" + c;
        bid = "b" + id;
        iid = "i" + id;
        lid = "l" + id;
        //col = "<div id='" + id +"'></div>";
        //src = "https://via.placeholder.com/200";
        //aID = "a" + id;
        //col = "<a id='" + aID + "'><img src='" + src + "' id='"+ id + "' width='9%'></a>";
        col = "<div id='" + id + "' class='form-group' style='max-width:10%; float:left;'><input type='text' class='form-control' placeholder='Image'><input type='text' class='form-control' placeholder='Redirect'><button id='"+bid+"'type='submit' class='btn btn-success btn-small'>Buy</button></div>";
        //$("#" + r).append(col);
        $("#" + r).append(col);


      }
    }
    return await App.initWeb3();
  },

  initWeb3: async function() {
    console.log("in init web3");
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        await window.ethereum.enable();
      } catch(error) {
        console.log("User denied account access")
      }
    } else 
    if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function() {
    console.log("in initContract");
    $.getJSON('Ad.json', function(data) {
      var AdArtifact = data;
      App.contracts.Ad = TruffleContract(AdArtifact);
      App.contracts.Ad.setProvider(App.web3Provider);
      return App.getAllAds();
    })

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn', App.handleBuy);
  },

  getAllAds: function() {
    console.log("in getAllAds");
    var adInst;

    App.contracts.Ad.deployed().then(function(instance) {
      adInst = instance;
      for(let r = 0; r < 10; r++) {
        for(let c = 0; c < 10; c++) {
          adInst.getAd(r, c).then(function(result) {
            console.log(r, c);
            console.log(result);
            if (result[0] === false) {
              var holder = "";
            } else {
              App.updateAd(r, c, result[1], result[2]);
            }
          });
        } 
      }
    }).catch(function(err) {
      console.log(err.message);
    })
  },

  updateAd: function(r, c, imgLink, redirectLink) {
    adID = "" + r + c;
    console.log(adID);
    linkID = "a" + adID;
    src = imgLink;
    redir = redirectLink;
    col = "<a id='" + linkID + "' href='"+redir+"'><img src='" + src + "' width='90%' height='90%'></a>";
    $("#" + adID).empty();
    $("#" + adID).append(col);
  },

  handleBuy: function(event) {
    event.preventDefault();

    var adInst;

    id = event.target.id.slice(1);
    r = parseInt(id.slice(0,1));
    c = parseInt(id.slice(1));
    console.log(id);
    m = $("#" + id).children();
    imgL = m[0].value;
    redirectLink = m[1].value;
    if (imgL === "" || redirectLink === "") {
      alert("Invalid buy attempt");
    } else {
      console.log(imgL);
      console.log(redirectLink);
      //1. disable button
      $("#" + event.target.id).prop('disabled', true);
      //2. send data to backend
      web3.eth.getAccounts(function(error, accounts) {
        if (error) {
          console.log(error);
        }
        var account = accounts[0];
        App.contracts.Ad.deployed().then(function(instance) {
          adInst = instance;
          return adInst.buyBlock(r, c, imgL, redirectLink, {from: account, value: 1000000000000000000});
        }).then(function(result) {
          return App.updateAd(r, c, imgL, redirectLink);
        }).catch(function(err) {
          console.log(err);
        });
      });

    }

  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
