'use strict';

/*

put this in ./util folder
with links inside ./someother/util
inside folder ./someother
$ ln -s ../util util


to use in a file... include this line:
let __ = require('./util');
or
let __ = require('./util/RiRutil');

*/

/*
 * debugging boilerplate
 * begin
**/
const dline = '========================';
const sline = '------------------------';

let isSilent  = false;
let isVerbose = false;
let isDebug   = false;

function setSilent(val=true)  {isSilent=val};
function setVerbose(val=true) {isVerbose=val};
function setDebug(val=true)   {isDebug=val};

function getIsSilent()  {return isSilent};
function getIsVerbose() {return isVerbose};
function getIsDebug()   {return isDebug};

function progdot(){ if(!isSilent) process.stdout.write('.');}

function clog(...args){ if(             !isSilent) console.log(...args);}
function dlog(...args){ if(isDebug   && !isSilent) console.log(...args);}
function vlog(...args){ if(isVerbose && !isSilent) console.log(...args);}

function clogdline(){ clog(dline);}
function clogsline(){ clog(sline);}

function dlogdline(){ dlog(dline);}
function dlogsline(){ dlog(sline);}

function vlogdline(){ dlog(dline);}
function vlogsline(){ dlog(sline);}
/*
 * end
 * debugging boilerplate
**/
let nums = [];
let _strarr = [];
function getNumbersFromCommandLine(){return nums;}
function getStringsFromCommandLine(){return _strarr;}

function parseCommandLineArgs(name='something',extraArr=[]){
    
    let isError = false;
    let unknownArgs = [];
    const myArgs = process.argv.slice(2);
    let smyArgs = myArgs.slice(); // save a copy

    /*
    hey look, it is data drive
    note:  add flags and functtion to set them, here
    note:  the area nums hold any INTEGERS found
    */
    let arglist = [
      {key:['-d','--debug'  ], val: setDebug   },
      {key:['-v','--verbose'], val: setVerbose },
      {key:['-s','--silent' ], val: setSilent  },
    ];

    let argmap = new Map();
    arglist.forEach((e,i,arr)=>{
      e.key.forEach((v)=>{
        argmap.set( v.toLowerCase(), e.val);
      });
    });
    myArgs.forEach((e,i,arr)=>{
      let se = e.toLowerCase();
      let testNum   = parseInt(e);
      if( argmap.has(se) ) {
        argmap.get(se)(); // look it up and call it.
      }else if(!isNaN(testNum)){
        nums.push(testNum);
      }else if(e.charAt(0)=='-'){
        isError = true;
        unknownArgs.push(e);
      }else{
        _strarr.push(e);
      }
    });
    if(isError || unknownArgs.length > 0){
        console.log();
        console.log('unknown args:',unknownArgs )
        // let shelp = myArgs[0].toLowerCase();
        // if( shelp === '-h' || '--help')
        console.log();
        console.log(`usage: node ${name}.js [number ...][-d | --debug] [-v | --verbose] [-s | --silent]`);
        console.log();
        console.log('       -d or --debug.  : extra debugging output');
        console.log('       -v or --verbose : extra chatty output');
        console.log('       -s or --silent  : only output the answer');
        console.log();
        extraArr.forEach((e,i,arr)=>{
            console.log(e);
        });
        // console.log('Starting number, equal to or less than input number, produces the longest collatz sequence (chain of numbers)?');
        // console.log();
        // console.log('Default number is 13.');
        console.log();
        return(false);
    }

    dlog()
    dlog('calling args: ',smyArgs)
    dlog()
    if(isVerbose) clog('verbose set to TRUE')
    if(isDebug)   clog('  debug set to TRUE')
    if(nums.length>0)   dlog(' integers found on command line:', nums);
    return true;
}

module.exports = {
  // isSilent, isDebug, isVerbose,
  setSilent, setVerbose, setDebug,
  getIsSilent, getIsVerbose, getIsDebug,
  progdot,
  clog, dlog, vlog,
  clogdline, clogsline,
  dlogdline, dlogsline,
  vlogdline, vlogsline,
  getNumbersFromCommandLine,
  getStringsFromCommandLine,
  parseCommandLineArgs
};
