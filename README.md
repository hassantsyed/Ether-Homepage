# README
Name: Hassan
Repo: https://github.com/hts13/CS1699_proj4

## Project Description:
I decided to make a 'clone' of the million dollar homepage except for Ethereum. You can buy blocks of space on the page for 1 Ether. You then provide a redirect link and image link which will display in the slot you chose if not already occupied.

## Setup
* Truffle (Development Framework)
* Ganache (Local blockchain)
* NPM 3.5.2
* Solidity +0.4.20
* metamask


## How to run:
1. Install npm
2. Install truffle
3. Install ganache
4. Install metamask
5. run ganache
    * ensure that it is running on port 7545
6. open metamask in your browser and click 'Main Ethereum Network'
7. click 'Custom RPC'
8. scroll down to the RPC link field and enter 'http://localhost:7545'
9. ensure that you metamask is running on this RPC (should have the custom RPC where 'Main Ethereum Network' was previously)
 import account steps
10. run the following in a terminal at the base of the project directory `truffle migrate --reset`
11. run `npm run dev`
    * this should open up a chrome browser to localhost:3000
12. You should now be able to interact with the homepage.
