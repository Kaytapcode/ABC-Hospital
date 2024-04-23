const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://khanhpear:123@cluster0.rzo0p3f.mongodb.net/hospital?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true });

const DoctorSchema = {
    loginName: { type: String, unique: true },
    password: String,
    email: String,
    Info: {
        name: String,
        age: Number,
        gender: String,
        comment: String,
        experience: String,
        specialized: String,
        degree: String,
        image: String
    },
    listOfPaitent: []
}

const PaitentSchema = {
    loginName: { type: String, unique: true },
    password: String,
    email: String,
    Info: {
        name: String,
        age: Number,
        gender: String,
        dayOfbirth: String,
        phoneNum: String,
        career: String,
        typeOfdisease: String,
        doctorComment: String
    }
}

class Information{
    constructor(name, age, gender){
        this.Name = name;
        this.Age = age;
        this.Gender = gender;
    }

    set Age(age){
        this._age = age;
    }

    get Age(){return this._age};

    set Name(name){
        this._name = name;
    }

    get Name(){return this._name};

    set Gender(gender){
        this._gender = gender;
    }

    get Gender(){return this._gender};
}

class DoctorInfo extends Information{
    constructor(name, age, gender, comment, experience, specialized, degree, image){
        super(name, age, gender);
        this.Comment = comment;
        this.Experience = experience;
        this.Specialized = specialized;
        this.Degree = degree;
        this.Image = image;
    }

    set Comment(comment){
        this._comment = comment;
    }

    get Comment(){return this._comment};

    set Experience(experience){
        this._experience = experience;
    }

    get Experience(){return this._experience};

    set Specialized(specialized){
        this._specialized = specialized;
    }

    get Specialized(){return this._specialized};

    set Degree(degree){
        this._degree = degree;
    }

    get Degree(){return this._degree};

    set Image(image){
        this._image = image;
    }

    get Image(){return this._image};
}

class PaitenceInfo extends Information{
    constructor(name, age, gender, dayOfbirth, phoneNum, career, typeOfdisease, doctorComment){
        super(name, age, gender);
        this.DayOfbirth = dayOfbirth;
        this.PhoneNum = phoneNum;
        this.Career = career;
        this.TypeOfdisease = typeOfdisease;
        this.DoctorComment = doctorComment;
    }

    set DayOfbirth(dayOfbirth){
        this._dayOfbirth = dayOfbirth;
    }

    get dayOfbirth(){return this._dayOfbirth};

    set PhoneNum(phoneNum){
        this._phoneNum = phoneNum;
    }

    get PhoneNum(){return this._phoneNum};

    set Career(career){
        this._career = career;
    }

    get Career(){return this._career};

    set TypeOfdisease(typeOfdisease){
        this._typeOfdisease = typeOfdisease;
    }

    get TypeOfdisease(){return this._typeOfdisease};

    set DoctorComment(doctorComment){
        this._doctorComment = doctorComment;
    }

    get DoctorComment(){return this._doctorComment};

}

class Person{
    constructor(loginName, password, email){
        this.LoginName = loginName;
        this.Password = password;
        this.Email = email;
    }

    set LoginName(loginName){
        this._loginName = loginName;
    }

    get LoginName(){return this._loginName};

    set Password(password){
        this._password = password;
    }

    get Password(){return this._password};

    set Email(email){
        this._email = email;
    }

    get Email(){return this._email};

}

class Doctor extends Person{
    constructor(loginName, password, email, docInfo){
        super(loginName, password, email);
        this.DocInfo = docInfo;
    }

    set DocInfo(docInfo){
        this._docInfo = docInfo;
    }

    get DocInfo(){return this._docInfo};
}

class Paitence extends Person{
    constructor(loginName, password, email, paitInfo){
        super(loginName, password, email);
        this.PaitInfo = paitInfo;
    }

    set PaitInfo(paitInfo){
        this._paitInfo = paitInfo;
    }

    get PaitInfo(){return this._paitInfo};
}

const info = new Information("Le Nguyen Nam Khanh", "25", "male");

docInfo = new DoctorInfo(
    info.Name,
    info.Age,
    info.Gender,
    "he is very capable",
    "Has been working in the company about 4 years",
    "very capable at doing heart disaese",
    "Has a degree from ABC university",
    "image-1.jpg"
)

let Doc1 = new Doctor("KhanhPear3107", "hello123", "lekhanh98777@gmail.com", docInfo);

const Doctors = mongoose.model("Doctor", new mongoose.Schema(DoctorSchema));
const Paitents = mongoose.model("Paitent", new mongoose.Schema(PaitentSchema));

const newPaitent = new Paitents({
    loginName: "Supreme3byte",
    password: "byebye",
    email: "TuDuongThanh@gmail.com",
    Info: {
        name: "Dương Thanh Tú",
        age: 20,
        gender: "male",
        dayOfbirth: "05/04/2003",
        phoneNum: "0123456789",
        career: "SVBK",
        typeOfdisease: "Hoang tưởng cấp độ năng",
        doctorComment: "Cần ít tự ái lại"
    }
});



const newDoctor = new Doctors({
    loginName: Doc1.LoginName,
    password: Doc1.Password,
    email: Doc1.Email,
    Info: {
        name: Doc1.DocInfo.Name,
        age: Doc1.DocInfo.Age,
        gender: Doc1.DocInfo.Gender,
        comment: Doc1.DocInfo.Comment,
        experience: Doc1.DocInfo.Experience,
        specialized: Doc1.DocInfo.Specialized,
        degree: Doc1.DocInfo.Degree,
        image: Doc1.DocInfo.Image
    }
});

//newDoctor.save(); //đừng có ấn vô đây ha
//newPaitent.save();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("css"));
app.use(express.static("assets"));
app.use(express.static("benh_nhan"));
app.use(express.static("forms"));
app.use(express.static("login_signup"));

//Phần HOMEPAGE (đăng nhập và đăng kí)---------------------------------------------//

app.get("/", function(req, res){
    let day = "";
    res.render("home", {day: day});
    //res.send("HELLO MOTHERFUCKER\n");
});

app.get("/login", function(req, res){
    res.render("login");
})

app.post("/login", function(req, res){
    let docloginname = req.body.inputMsnv1;
    let docpassword = req.body.inputPassword1;
    let paitloginname = req.body.inputPhoneNumber;
    let paitpassword = req.body.inputPassword2;

    Doctors.findOne({loginName: docloginname}, function(err, foundUser){
        if(foundUser){
            //console.log(loginname);
            if(foundUser.password === docpassword){
                //console.log(password);
                res.redirect("/docAcc/" + foundUser._id);
            }
            else console.log("the password is incorrect, please try again!\n");
        } 
        if(err){
            console.log("didn't found it, please sign up first\n");
        }  
    })

    Paitents.findOne({loginName: paitloginname}, function(err, foundUser){
        if(foundUser){
            //console.log(loginname);
            if(foundUser.password === paitpassword){
                //console.log(password);
                res.redirect("/guestAcc/" + foundUser._id);
            }
            else console.log("the password is incorrect, please try again!\n");
        }
        if(err){
            console.log("didn't found it, please sign up first\n");
        }     
    })
})

app.get("/signup", function(req, res){
    res.render("signup");
});

app.post("/signup", function(req, res){
    let paitFullName = req.body.inputFullName;
    let paitAccountName = req.body.inputAccountName;
    let paitPassword = req.body.inputPassword;
    let paitEmail = req.body.inputEmail;
    let paitGender = req.body.inputGender;

    const newPait = new Paitents({
        loginName: paitAccountName,
        password: paitPassword,
        email: paitEmail,
        Info: {
            name: paitFullName,
            age: 0,
            gender: paitGender,
            dayOfbirth: "dd/mm/yyyy",
            phoneNum: "",
            career: "",
            typeOfdisease: "",
            doctorComment: ""
        }
    });

    newPait.save(function(err, savedPait) {
        if (err) {
            if(err.code === 11000){
                console.log("this name already exist, please choose another username");
                res.redirect("/signup");
            }
            else console.error("", err);
        } else {
            const id = savedPait._id;
            res.redirect("/guestAcc/" + id);
        }
    });
    
   //res.render("signup");
});

app.get("/data", function(req, res){
    res.render("data");
})

app.get("/calender", function(req, res){
    res.render("calender");
});

//Tài khoản của bác sĩ quản lý ở đây-------------------------------------------//

//Đây là phần xử lý thông tin cá nhân của bác sĩ lên tài khoản của họ (docAcc)

//docAcc sẽ truyền đến home của account bác sĩ
app.get("/docAcc/:DocID", function(req, res){
    let ID = (req.params.DocID);
    Doctors.findOne({_id: ID}, function(err, doctorData){
        res.render("docAccount", {data: doctorData});
    })
});

app.post("/docAcc/:DocID", function(req, res){
    let ID = (req.params.DocID);
    Doctors.findOne({_id: ID}, function(err, doctor){
        res.render("docAccount");
    })
});
//----------------------------------------------------------//

app.get("/lookup", function(req, res){
    res.render("paitent_lookup");
});

//paitentList sẽ truyền đến phần theo dõi bệnh nhân của bác sĩ
app.get("/paitentList/:DocID", function(req, res){
    let ID = (req.params.DocID);
    Doctors.findOne({_id: ID}, function(err, doctorData){
        res.render("paitent_list", {data: doctorData});
    })
});

//medicine sẽ truyền đến kho thuốc - kho thuốc này dùng chung cho mọi bác sĩ
app.get("/medicineStorage/:DocID", function(req, res){
    let ID = (req.params.DocID);
    Doctors.findOne({_id: ID}, function(err, doctorData){
        res.render("medicine", {data: doctorData});
    })
});

//equipment sẽ truyền đến kho thiết bị y tế của bệnh viện
app.get("/equipment/:DocID", function(req, res){
    let ID = (req.params.DocID);
    Doctors.findOne({_id: ID}, function(err, doctorData){
        res.render("equipment", {data: doctorData});
    })
});


//Tài khoản của bệnh nhân quản lý ở đây-----------------------------------------//

// app.get("/paitentAccount", function(req, res){
//     res.render("paitentAccount");
// });

//guestAcc sẽ giúp ta đến với trang chủ chính của bênh nhân khi đăng nhập
app.get("/guestAcc/:GuestID", function(req, res){
    let ID = (req.params.GuestID);
    Paitents.findOne({_id: ID}, function(err, paitentData){
        res.render("paitentAccount", {data: paitentData});
    })
});

app.post("/guestAcc/:GuestID", function(req, res){
    let ID = (req.params.GuestID);
    Paitents.findOne({_id: ID}, function(err, paitentData){
        res.render("paitentAccount", {data: paitentData});
    })
});

//-----------------------------------------------------------------//

//personalInfo sẽ đưa chúng ta tới thông tin cá nhân của bệnh nhân và sửa đổi thông tin
app.get("/personalInfo/:GuestID", function(req, res){
    let ID = (req.params.GuestID);
    Paitents.findOne({_id: ID}, function(err, paitentData){
        res.render("paitentInfo", {data: paitentData});
    })
});

app.post("/personalInfo/:GuestID", async function(req, res){
    let ID = (req.params.GuestID);
    const basePaitent = await Paitents.findOne({_id: ID});

    let changedname = req.body.name_modify;
    let changedphonenum = req.body.phone_number_modify;
    let changedDOB = req.body.date_of_birth_modify;
    let changedgender = req.body.gender_modify;
    let changedjob = req.body.job_modify;

    console.log(changedgender);

    if(changedname !== basePaitent.Info.name){
        await Paitents.findOneAndUpdate({_id: ID}, {$set: {'Info.name': changedname}});
    }
    if(changedphonenum !== basePaitent.Info.phoneNum){
        await Paitents.findOneAndUpdate({_id: ID}, {$set: {'Info.phoneNum': changedphonenum}});
    }
    if(changedDOB !== basePaitent.Info.dayOfbirth){
        await Paitents.findOneAndUpdate({_id: ID}, {$set: {'Info.dayOfbirth': changedDOB}});
    }
    if(changedgender !== basePaitent.Info.gender && changedgender !== undefined){
        await Paitents.findOneAndUpdate({_id: ID}, {$set: {'Info.gender': changedgender}});
    }
    if(changedjob !== basePaitent.Info.career){
        //console.log(changedjob);
        await Paitents.findOneAndUpdate({_id: ID}, {$set: {'Info.career': changedjob}});
    }

    await Paitents.findOne({_id: ID},  function(err, paitentData){
        //console.log(paitentData.Info.gender);
        res.redirect("/personalInfo/" + paitentData._id);
    })

    // Paitents.findOneAndUpdate({_id: ID}, {$set: {'Info.name': changedname, 'Info.phoneNum': changedphonenum, 'Info.dayOfbirth': changedDOB, 'Info.gender': changedgender, 'Info.career': changedjob}}, function(err, paitentData){
    //     console.log(changedjob);
    //     //res.render("paitentInfo", {data: paitentData});
    //     res.redirect("/personalInfo/" + paitentData._id);
    // })
});


app.get("/doctor", function(req, res){
    Doctors.find({}, function(err, list){
        //console.log(list[0]);
        res.render("doctor", {list : list})
    });
});

app.get("/profile/:DocID", function(req, res){
    let ID = (req.params.DocID);
    Doctors.findOne({_id: ID}, function(err, doctor){
        res.render("profile", {doctor: doctor})
    })
 });

app.listen(5500, function(){
    console.log("server turn on\n");
});
