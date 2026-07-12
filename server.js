const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

try {
  process.loadEnvFile();
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const app = express();
const port = Number(process.env.PORT) || 5500;

const doctorSchema = new mongoose.Schema(
  {
    loginName: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, select: false },
    email: { type: String, required: true, trim: true },
    Info: {
      name: { type: String, default: "" },
      age: Number,
      gender: { type: String, default: "" },
      comment: { type: String, default: "" },
      experience: { type: String, default: "" },
      specialized: { type: String, default: "" },
      degree: { type: String, default: "" },
      image: { type: String, default: "doctors-1.jpg" },
    },
  },
  { timestamps: true }
);

const Doctors = mongoose.model("Doctor", doctorSchema);

const patientSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    passwordHash: { type: String, required: true, select: false },
    healthInsuranceId: { type: String, required: true, trim: true, unique: true },
    gender: { type: String, required: true, enum: ["Nam", "Nữ"] },
  },
  { timestamps: true }
);

const Patients = mongoose.model("Patient", patientSchema);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
const assetsDirectory = path.join(__dirname, "assets");

// New templates reference assets from the URL root (/css, /vendor, /img...).
// Legacy HTML files reference the same directory through /assets/....
// Keep both mounts so every page resolves to the same physical files.
app.use(express.static(assetsDirectory));
app.use("/assets", express.static(assetsDirectory));
app.use("/booking", express.static(path.join(__dirname, "booking")));

const staticPages = [
  "check_profile_bac_si.html",
  "home_bac_si.html",
  "home_benhnhan.html",
  "ho_so_benh_an.html",
  "ke_don.html",
  "theo_doi_benh_nhan.html",
  "thuoc.html",
  "trang_thiet_bi.html",
  "update_thong_tin_ca_nhan.html",
];

for (const page of staticPages) {
  app.get(`/${page}`, (req, res) => {
    res.sendFile(path.join(__dirname, page));
  });
}

function requireDatabase(req, res, next) {
  if (mongoose.connection.readyState === 1) return next();
  return res
    .status(503)
    .send("MongoDB chưa kết nối. Hãy kiểm tra MONGODB_URI trong file .env.");
}

app.get("/", (req, res) => {
  res.render("home", { day: "" });
});

app.get("/login", (req, res) => {
  res.render("login", { registered: req.query.registered === "1" });
});

app.post("/login", requireDatabase, async (req, res, next) => {
  try {
    const loginName = req.body.inputMsnv1;
    const password = req.body.inputPassword1;
    const foundUser = await Doctors.findOne({ loginName }).select("+password");

    if (!foundUser || foundUser.password !== password) {
      return res.status(401).send("Tên đăng nhập hoặc mật khẩu không đúng.");
    }

    return res.redirect(`/docAcc/${foundUser._id}`);
  } catch (error) {
    return next(error);
  }
});

app.post("/patient-login", requireDatabase, async (req, res, next) => {
  try {
    const email = String(req.body.inputEmail || "").trim().toLowerCase();
    const password = String(req.body.inputPassword || "");
    const patient = await Patients.findOne({ email }).select("+passwordHash");

    if (!patient || !(await bcrypt.compare(password, patient.passwordHash))) {
      return res.status(401).send("Email hoặc mật khẩu không đúng.");
    }

    return res.redirect("/guestAccount");
  } catch (error) {
    return next(error);
  }
});

app.get("/signup", (req, res) => {
  res.render("signup", { error: null, values: {} });
});

app.post("/signup", requireDatabase, async (req, res, next) => {
  const values = {
    firstName: String(req.body.inputFirstName || "").trim(),
    lastName: String(req.body.inputLastName || "").trim(),
    email: String(req.body.inputEmail || "").trim().toLowerCase(),
    healthInsuranceId: String(req.body.inputBHYT || "").trim(),
    gender: String(req.body.inputGender || "").trim(),
  };
  const password = String(req.body.inputPassword || "");

  try {
    if (
      !values.firstName ||
      !values.lastName ||
      !values.email ||
      !values.healthInsuranceId ||
      !["Nam", "Nữ"].includes(values.gender) ||
      password.length < 8
    ) {
      return res.status(400).render("signup", {
        error: "Vui lòng nhập đầy đủ thông tin; mật khẩu cần ít nhất 8 ký tự.",
        values,
      });
    }

    const existingPatient = await Patients.exists({
      $or: [
        { email: values.email },
        { healthInsuranceId: values.healthInsuranceId },
      ],
    });

    if (existingPatient) {
      return res.status(409).render("signup", {
        error: "Email hoặc mã bảo hiểm y tế đã được đăng ký.",
        values,
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await Patients.create({ ...values, passwordHash });
    return res.redirect("/login?registered=1");
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).render("signup", {
        error: "Email hoặc mã bảo hiểm y tế đã được đăng ký.",
        values,
      });
    }
    return next(error);
  }
});

app.get("/data", (req, res) => {
  res.render("data");
});

app.get("/calender", (req, res) => {
  res.render("calender");
});

app.get("/docAcc/:DocID", requireDatabase, async (req, res, next) => {
  try {
    if (!mongoose.isObjectIdOrHexString(req.params.DocID)) {
      return res.status(400).send("Mã bác sĩ không hợp lệ.");
    }

    const doctorData = await Doctors.findById(req.params.DocID).lean();
    if (!doctorData) return res.status(404).send("Không tìm thấy bác sĩ.");
    return res.render("docAccount", { data: doctorData });
  } catch (error) {
    return next(error);
  }
});

app.post("/docAcc/:DocID", requireDatabase, (req, res) => {
  res.redirect(`/docAcc/${req.params.DocID}`);
});

app.get("/guestAccount", (req, res) => {
  res.render("paitentAccount");
});

app.get("/doctor", requireDatabase, async (req, res, next) => {
  try {
    const list = await Doctors.find({}).lean();
    return res.render("doctor", { list });
  } catch (error) {
    return next(error);
  }
});

app.get("/profile/:DocID", requireDatabase, async (req, res, next) => {
  try {
    if (!mongoose.isObjectIdOrHexString(req.params.DocID)) {
      return res.status(400).send("Mã bác sĩ không hợp lệ.");
    }

    const doctor = await Doctors.findById(req.params.DocID).lean();
    if (!doctor) return res.status(404).send("Không tìm thấy bác sĩ.");
    return res.render("profile", { doctor });
  } catch (error) {
    return next(error);
  }
});

app.use((error, req, res, next) => {
  console.error(error);
  if (res.headersSent) return next(error);
  return res.status(500).send("Đã xảy ra lỗi phía server.");
});

async function start() {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
      });
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection failed:", error.message);
      console.warn("Server sẽ tiếp tục chạy, nhưng các trang cần database sẽ trả HTTP 503.");
    }
  } else {
    console.warn("Chưa có MONGODB_URI trong .env; chỉ các trang không cần database hoạt động.");
  }

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

start();
