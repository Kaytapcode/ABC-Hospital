const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://khanhpear:123@cluster0.rzo0p3f.mongodb.net/hospital?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true });

const DoctorSchema = {
    loginName: String,
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

    constructor(name, age, gender, disease){
        super(name, age, gender);
        this.Disease = disease; 
    }

    set Disease(disease){
        this._disease = disease;
    }

    get Disease(){return this._disease};

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
    let loginname = req.body.inputMsnv1;
    let password = req.body.inputPassword1;
    Doctors.findOne({loginName: loginname}, function(err, foundUser){
        if(foundUser){
            console.log(loginname);
            if(foundUser.password === password){
                console.log(password);
                res.redirect("/docAcc/" + foundUser._id);
            }
        }   
    })
})

app.get("/signup", function(req, res){
    res.render("signup");
})

app.get("/data", function(req, res){
    res.render("data");
})

app.get("/calender", function(req, res){
    res.render("calender");
});

//Tài khoản của bác sĩ quản lý ở đây-------------------------------------------//

//Đây là phần xử lý thông tin cá nhân của bác sĩ lên tài khoản của họ (docAcc)
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

//Tài khoản của bệnh nhân quản lý ở đây-----------------------------------------//

app.get("/guestAccount", function(req, res){
    res.render("paitentAccount");
});

app.get("/doctor", function(req, res){
    Doctors.find({}, function(err, list){
        console.log(list[0]);
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
