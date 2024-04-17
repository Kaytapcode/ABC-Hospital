const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://khanhpear:123@cluster0.rzo0p3f.mongodb.net/hospital?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true });

const DoctorSchema = {
    loginName: String,
    password: String,
    Info: {
        name: String,
        age: Number,
        gender: String,
        comment: String,
        experience: String,
        specialized: String,
        degree: String
    }
}

class Information{

    constructor(name, age, gender){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    setAge(age){
        this._age = age;
    }

    getAge(){return this.age};

    setName(name){
        this._name = name;
    }

    getName(){return this.name};

    setGender(gender){
        this._gender = gender;
    }

    getGender(){return this.gender};
}

class DoctorInfo extends Information{
    constructor(name, age, gender, comment, experience, specialized, degree){
        super(name, age, gender);
        this.comment = comment;
        this.experience = experience;
        this.specialized = specialized;
        this.degree = degree;
    }

    setComment(comment){
        this._comment = comment;
    }

    getComment(){return this.comment};

    setExperience(experience){
        this._experience = experience;
    }

    getExperience(){return this.experience};

    setSpecialized(specialized){
        this._specialized = specialized;
    }

    getSpecialized(){return this.specialized};

    setDegree(degree){
        this._degree = degree;
    }

    getDegree(){return this.degree};
}

class Person{
    constructor(loginName, password){
        this.loginName = loginName;
        this.password = password;
    }

    setLoginName(loginName){
        this._loginName = loginName;
    }

    getLoginName(){return this.loginName};

    setPassword(password){
        this._password = password;
    }

    getPassword(){return this.password};

    // setInfo(info){
    //     this._info = info;
    // }

    // getInfo(){return this.info};

}

class Doctor extends Person{
    constructor(loginName, password, docInfo){
        super(loginName, password);
        this.docInfo = new DoctorInfo(docInfo.info, docInfo.comment, docInfo.experience, docInfo.specialized, docInfo.degree);
    }
}

let info = new Information("Le Nguyen Nam Khanh", "25", "male");

docInfo = new DoctorInfo(
    info,
    "he is very capable",
    "Has been working in the company in 4 years",
    "very capable in doing heart disaese",
    "Has a degree in ABC university"
)

let Doc1 = new Doctor("KhanhPear3107", "hello123", docInfo);

console.log("The LoginName is" + Doc1.getLoginName());

