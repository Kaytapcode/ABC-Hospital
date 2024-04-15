const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://khanhpear:123@cluster0.rzo0p3f.mongodb.net/hospital?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true });

class Person{
    Person(loginName, passWord, info){
        this.loginName = loginName;
        this.passWord = passWord;
        this.info = info;
    }

    setLoginName(loginName){
        this._loginName = loginName;
    }

    getLoginName(){return this.loginName};

    setLoginName(loginName){
        this._loginName = loginName;
    }

    getLoginName(){return this.loginName};

    setLoginName(loginName){
        this._loginName = loginName;
    }

    getLoginName(){return this.loginName};

}