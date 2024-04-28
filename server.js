const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const now = new Date();

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
    },
    paitCode: {type: String, unique: true},
    conditionProgress: [{
        dayInfo: {
            time: String,
            symptom: String,
            guess: String,
            medicine:[{
                medicineName: String,
                medicineUnit: String,
                quantity: Number,
                comment: String
            }]
        }
    }]
}

const DrugSchema = {
    name: String,
    quantity: Number,
    unit: String,
    symptomUsed: String,
    available: Boolean
}

const ItemSchema = {
    name: String,
    Info: {
        id: String,
        type: String,
        manufacture: String,
        condition: String,
        maintainancePeriod: String
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
const Drugs = mongoose.model("drug", new mongoose.Schema(DrugSchema));
const Items = mongoose.model("item", new mongoose.Schema(ItemSchema));


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
    },
    conditionProgress: []
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

const newDrug1 = new Drugs({
    name: "Paracetamol",
    quantity: 1000,
    unit: "Viên",
    symptomUsed: "đau đầu",
    available: true
})

const newDrug2 = new Drugs({
    name: "Alexan",
    quantity: 1000,
    unit: "Hộp",
    symptomUsed: "đau khớp",
    available: true
})

const newDrug3 = new Drugs({
    name: "Motilum M",
    quantity: 1000,
    unit: "Viên",
    symptomUsed: "đau dạ dày",
    available: true
})

const newDrug4 = new Drugs({
    name: "Smecta",
    quantity: 1000,
    unit: "Hộp",
    symptomUsed: "bị tiêu chảy",
    available: true
})

const newDrug5 = new Drugs({
    name: "Mỡ Eurax",
    quantity: 1000,
    unit: "Tuýp",
    symptomUsed: "chữa ghẻ",
    available: true
})

const newDrug6 = new Drugs({
    name: "Oxy già",
    quantity: 1000,
    unit: "Chai",
    symptomUsed: "chữa ghẻ",
    available: true
})

const newDrug7 = new Drugs({
    name: "Nước muối sinh lý",
    quantity: 1000,
    unit: "Chai",
    symptomUsed: "chữa ghẻ",
    available: true
})

// const arr = [newDrug1, newDrug2, newDrug3, newDrug4, newDrug5, newDrug6, newDrug7]
// Drugs.insertMany(arr);
// newDoctor.save(); //đừng có ấn vô đây ha
// newPaitent.save();

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
    res.render("login", {checkpait1: true, checkpait2: true, message: ""});
});

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
            else {
                res.render("login",{checkpait1: false, checkpait2: true, message: "the password is incorrect, please try again!"});
                console.log("the password is incorrect, please try again!\n");
            }
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
            else {
                res.render("login",{checkpait1: true, checkpait2: false, message: "the password is incorrect, please try again!"});
                console.log("the password is incorrect, please try again!")
            }
        }
        if(err){
            console.log("didn't found it, please sign up first\n");
        }     
    })
})

app.get("/signup", function(req, res){
    res.render("signup", {checkexisted: false, message: ""});
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
                res.render("signup", {checkexisted: true, message: "this name already exist, please choose another username"});
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

//paitentList sẽ truyền đến phần theo dõi bệnh nhân của bác sĩ để xem thông tin của những bệnh nhân bác sĩ đó quản lý
app.get("/paitentList/:DocID", async function(req, res){
    let ID = (req.params.DocID);
    let doctorObj = await Doctors.findOne({_id: ID});
    let paitList = [];

    // let checkID = doctorObj.listOfPaitent[0];
    // let obj = await Paitents.findOne({_id: checkID});
    // console.log(obj.loginName);
    
    for(let i = 0; i < doctorObj.listOfPaitent.length; i++){
        let checkID = doctorObj.listOfPaitent[i];
        let obj = await Paitents.findOne({_id: checkID});
        //console.log(obj);
        paitList.push(obj);
    }
    res.render("paitent_list", {data: doctorObj, list: paitList});
    
});


//paitentLookup sẽ truy cập đến 1 hồ sơ bệnh nhân cụ thể 
app.get("/paitentLookup/:DocID/:PaitID",  function(req, res){
    let docID = (req.params.DocID);
    let paitID = (req.params.PaitID);
    //const paitent =  await Paitents.findOne({_id: paitID});
    //await Drugs.find({}, )
    
    Paitents.findOne({_id: paitID}, function(err, paitData){
        res.render("paitent_lookup", { paitData: paitData, docID: docID});
    })
    
});

//checkup sẽ đi tới chỗ kê đơn của bác sĩ cho một bệnh nhân
app.get("/checkUp/:DocID", function(req, res){
    let ID = (req.params.DocID);
    Doctors.findOne({_id: ID}, function(err, doctorData){
        res.render("doctorCheckup", {data: doctorData});
    })
});

//post checkup (kê đơn) ở đây sẽ giúp cập nhật thêm 1 chuẩn đoán và lưu vào lịch sử khám của bệnh nhân
app.post("/checkUp/:DocID", async function(req, res){
    let ID = (req.params.DocID);
    //let name = req.body.name_ke_don;
    let code = req.body.number_ke_don;
    let symptom = req.body.trieu_chung_ke_don;
    let guess = req.body.chan_doan_ke_don;
    let item = []; //for(let i = 0; i < 5; i++){item.push(req.body.select_may_moc_i);}
    let medicine = [];

    for(let i = 1; i <= 5; i++){
        let drugName = req.body["select_thuoc_" + i]
        if(drugName !== "Chọn Thuốc:"){
            const medic = { 
                medicineName: drugName,
                medicineUnit: (await Drugs.findOne({name: drugName})).unit,
                quantity: 5,
                comment: "mỗi buổi sáng dùng 1 lần"
            }
            medicine.push(medic);

            await Drugs.findOneAndUpdate({name: drugName}, {$inc: {quantity: -medic.quantity}});
        }
    }

    const progress = {
        dayInfo: {
            time: now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear() + " - " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds(),
            symptom: symptom,
            guess: guess,
            medicine: medicine
        }
    }
    
    const updatePait = await Paitents.findOneAndUpdate({paitCode: code},{$push: {conditionProgress: progress}, $set: {'Info.typeOfdisease': symptom, 'Info.doctorComment': guess}});
    //console.log(updatePait); 
    res.redirect("/paitentLookup/" + ID + "/" + updatePait._id);
});

//medicine sẽ truyền đến kho thuốc - kho thuốc này dùng chung cho mọi bác sĩ
app.get("/medicineStorage/:DocID", function(req, res){
    let ID = (req.params.DocID);
    Doctors.findOne({_id: ID}, function(err, doctorData){
        Drugs.find({}, function(err, druglist){
            res.render("medicine", {data: doctorData, list: druglist});
        })
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

app.get("/paitentProfile/:GuestID", function(req, res){
    let paitID = (req.params.GuestID);
    
    Paitents.findOne({_id: paitID}, function(err, data){
        res.render("paitent_profile", { data: data});
    })
    
});

//hàm này giúp bệnh nhân kiểm tra thông tin của bác sĩ
app.get("/doctorlist/:GuestID", async function(req, res){
    let ID = (req.params.GuestID);
    const pait = await Paitents.findOne({_id: ID}, function(err, paitentData){});
    Doctors.find({}, function(err, docData){
        res.render("doctor", {docData: docData, data: pait});
    })
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
