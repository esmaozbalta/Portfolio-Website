// Gerekli modülleri yüklüyoruz.
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const session = require('express-session');

// Express uygulamasını oluşturuyoruz.
const app = express();
// PORT değişkenini tanımlıyoruz, 3000 portu varsayılan olarak kullanılıyor.
const PORT = process.env.PORT || 3000;

// Middleware ayarları
// bodyParser, gelen isteklerin gövdesini JSON ve URL-encoded olarak ayrıştırmak için kullanılır.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // CORS politikalarını yönetmek için kullanılır.
app.use(bodyParser.json()); // JSON verilerini ayrıştırmak için kullanılır.
// Public dizinini statik dosyalar için kullanıyoruz.
app.use(express.static(path.join(__dirname, '../public')));

// MongoDB bağlantısı
// MongoDB Atlas bağlantı dizesi ile veritabanına bağlanıyoruz.
const uri = 'mongodb+srv://es:es6118@Portfolio.2buwuap.mongodb.net/portfolyobase?retryWrites=true&w=majority&appName=Portfolio&tls=true';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB bağlantısı başarılı.');
  })
  .catch(err => {
    console.error('MongoDB bağlantı hatası:', err);
  });

// Eğitim Şeması ve Modeli
const EducationSchema = new mongoose.Schema({
  date: String,
  school: String,
  department: String,
  description: String,
});

const Education = mongoose.model('Education', EducationSchema);

// Yeni eğitim öğesi eklemek için API
app.post('/api/education', async (req, res) => {
  const { date, school, department, description } = req.body;

  const newEducation = new Education({
    date,
    school,
    department,
    description,
  });

  try {
    await newEducation.save();
    res.status(201).send(newEducation);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Eğitim verilerini almak için API
app.get('/api/getEducation', async (req, res) => {
  try {
    const educationData = await Education.find();
    res.status(200).json(educationData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Eğitim verileri alınamadı');
  }
});

// Deneyim Şeması ve Modeli
const ExperienceSchema = new mongoose.Schema({
  date: String,
  company: String,
  position: String,
  description: String,
});

const Experience = mongoose.model('Experience', ExperienceSchema);

// Yeni deneyim öğesi eklemek için API
app.post('/api/experience', async (req, res) => {
  const { date, company, position, description } = req.body;

  const newExperience = new Experience({
    date,
    company,
    position,
    description,
  });

  try {
    await newExperience.save();
    res.status(201).send(newExperience);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Deneyim verilerini almak için API
app.get('/api/getExperience', async (req, res) => {
  try {
    const experienceData = await Experience.find();
    res.status(200).json(experienceData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Deneyim verileri alınamadı');
  }
});

// Proje Şeması ve Modeli
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Project = mongoose.model('Project', projectSchema);

// Yeni proje eklemek için API
app.post('/api/projects', async (req, res) => {
  const { title, description } = req.body;

  const newProject = new Project({
    title,
    description,
  });

  try {
    await newProject.save();
    res.status(201).send(newProject);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Proje verilerini almak için API
app.get('/api/getProjects', async (req, res) => {
  try {
    const projectData = await Project.find();
    res.status(200).json(projectData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Proje verileri alınamadı');
  }
});

// Kişisel Bilgiler Şeması ve Modeli
const infoSchema = new mongoose.Schema({
  tel: String,
  mail: String,
  adress: String
});

const Info = mongoose.model('Info', infoSchema);

// Kişisel bilgileri kaydetmek için API
app.post('/saveInfo', async (req, res) => {
  const { tel, mail, adress } = req.body;

  // Önce mevcut bilgiyi sil (eğer varsa)
  await Info.deleteMany({});

  const newInfo = new Info({ tel, mail, adress });
  await newInfo.save();

  res.json(newInfo);
});

// Kişisel bilgileri almak için API
app.get('/getInfo', async (req, res) => {
  const info = await Info.findOne({});
  res.json(info);
});

// Dil Şeması ve Modeli
const LanguageSchema = new mongoose.Schema({
  language: String,
});

const Language = mongoose.model('Language', LanguageSchema);

// Yeni dil eklemek için API
app.post('/api/language', async (req, res) => {
  const { language } = req.body;

  const newLanguage = new Language({
    language,
  });

  try {
    await newLanguage.save();
    res.status(201).send(newLanguage);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Dil verilerini almak için API
app.get('/api/getLanguage', async (req, res) => {
  try {
    const languageData = await Language.find();
    res.status(200).json(languageData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Dil verileri alınamadı');
  }
});

// Kullanıcı Şeması ve Modeli
const KullaniciSchema = new mongoose.Schema({
  kullaniciAdi: String,
  sifre: String,
});

const Kullanici = mongoose.model('Kullanici', KullaniciSchema);

// Yeni kullanıcı kaydetmek için API
app.post('/api/register', async (req, res) => {
  const { kullaniciAdi, sifre } = req.body;

  const yeniKullanici = new Kullanici({
    kullaniciAdi,
    sifre,
  });

  try {
    await yeniKullanici.save();
    res.status(201).send('Kullanıcı kaydı başarılı');
  } catch (error) {
    console.error('Kullanıcı kaydı sırasında hata:', error);
    res.status(500).send('Kullanıcı kaydı sırasında bir hata oluştu');
  }
});

// Kullanıcı giriş işlemi için API
app.post('/api/login', async (req, res) => {
  const { kullaniciAdi, sifre } = req.body;

  try {
    const kullanici = await Kullanici.findOne({ kullaniciAdi, sifre });

    if (kullanici) {
      // Kullanıcı bulundu, giriş başarılı
      req.session.kullanici = kullanici; // Kullanıcıyı oturuma ekleyin
      res.status(200).send('Giriş başarılı');
    } else {
      // Kullanıcı bulunamadı, giriş başarısız
      res.status(401).send('Geçersiz kullanıcı adı veya şifre');
    }
  } catch (error) {
    console.error('Giriş işlemi sırasında hata:', error);
    res.status(500).send('Giriş işlemi sırasında bir hata oluştu');
  }
});

// Express-session yapılandırması
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Başarılı giriş sonrası yönlendirme
app.get('/hakkimda', (req, res) => {
  if (req.session.kullanici) {
    res.redirect('/hakkimda.html'); // Kullanıcı giriş yapmış, yönlendirme
  } else {
    res.status(401).send('Yetkisiz erişim'); // Kullanıcı giriş yapmamış
  }
});

// Sunucuyu belirlenen portta çalıştırıyoruz.
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
