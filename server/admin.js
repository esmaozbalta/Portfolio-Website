const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// MongoDB bağlantısı
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

// Eğitim verilerini almak için
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

// Deneyim verilerini almak için
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

const infoSchema = new mongoose.Schema({
  tel: String,
  mail: String,
  adress: String
});

const Info = mongoose.model('Info', infoSchema);

// Kişisel bilgileri kaydetme endpoint'i
app.post('/saveInfo', async (req, res) => {
  const { tel, mail, adress } = req.body;
  
  // Önce mevcut bilgiyi sil (eğer varsa)
  await Info.deleteMany({});
  
  const newInfo = new Info({ tel, mail, adress });
  await newInfo.save();
  
  res.json(newInfo);
});

// Kişisel bilgileri getirme endpoint'i
app.get('/getInfo', async (req, res) => {
  const info = await Info.findOne({});
  res.json(info);
});



// Deneyim Şeması ve Modeli
const LanguageSchema = new mongoose.Schema({
  language: String,
});

const Language = mongoose.model('Language', LanguageSchema);

// Yeni deneyim öğesi eklemek için API
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

// Deneyim verilerini almak için
app.get('/api/getLanguage', async (req, res) => {
  try {
    const languageData = await Language.find();
    res.status(200).json(languageData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Deneyim verileri alınamadı');
  }
});

// Kullanıcı Şeması ve Modeli
const KullaniciSchema = new mongoose.Schema({
  kullaniciAdi: String,
  sifre: String,
  eposta: String
});

const Kullanici = mongoose.model('Kullanici', KullaniciSchema);

// Kayıt ol endpoint'i
app.post('/kayit', async (req, res) => {
  const { kullaniciAdi, sifre, eposta } = req.body;

  const yeniKullanici = new Kullanici({ kullaniciAdi, sifre, eposta });

  try {
    await yeniKullanici.save();
    console.log('Yeni kullanıcı kaydedildi:', yeniKullanici);
    res.status(200).send('Kayıt işlemi başarılı');
  } catch (error) {
    console.error('Kayıt işlemi sırasında hata:', error);
    res.status(500).send('Kayıt işlemi sırasında bir hata oluştu');
  }
});
app.post('/login', async (req, res) => {
  const { kullaniciAdi, sifre } = req.body;

  try {
    const user = await Kullanici.findOne({ kullaniciAdi });

    if (!user || user.sifre !== sifre) {
      res.status(404).send('Kullanıcı bulunamadı veya şifre yanlış');
      return;
    }

    res.status(200).send('Giriş başarılı');
  } catch (error) {
    console.error('Giriş işlemi sırasında hata:', error);
    res.status(500).send('Kullanıcı bulunamadı veya şifre yanlış');
  }
});

// API endpointi
app.post('/api/updateLinks', async (req, res) => {
  const { githubLink, linkedinLink } = req.body;

  try {
    // Veritabanına kaydetme işlemleri burada yapılabilir
    console.log('Yeni GitHub Linki:', githubLink);
    console.log('Yeni LinkedIn Linki:', linkedinLink);

    // Başarılı yanıt gönder
    res.status(200).send('Bağlantılar başarıyla güncellendi');
  } catch (error) {
    console.error('Bağlantıları güncelleme hatası:', error);
    res.status(500).send('Bağlantıları güncelleme sırasında bir hata oluştu');
  }
});

// Proje Şeması ve Modeli
const hakkimdaSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Hakkimda = mongoose.model('Hakkimda', hakkimdaSchema);

// Yeni proje eklemek için API
app.post('/api/hakkimdas', async (req, res) => {
  const { title, description } = req.body;

  const newHakkimda = new Hakkimda({
    title,
    description,
  });

  try {
    await newHakkimda.save();
    res.status(201).send(newHakkimda);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Proje verilerini almak için API
app.get('/api/getHakkimdas', async (req, res) => {
  try {
    const hakkimdaData = await Hakkimda.find();
    res.status(200).json(hakkimdaData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Proje verileri alınamadı');
  }
});


const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String
});

const Contact = mongoose.model('Contact', contactSchema);

app.use(bodyParser.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  const contact = new Contact({
    name,
    email,
    phone,
    message
  });

  try {
    await contact.save();
    res.status(200).send('Mesaj başarıyla kaydedildi.');
  } catch (error) {
    res.status(500).send('Mesaj kaydedilirken bir hata oluştu.');
  }
});

app.use(express.static('public'));

app.get('/adminhakkimda.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/adminhakkimda.html'));
});

app.get('/contact.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/adminhakkimda.html'));
});

app.get('/hakkimda.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/hakkimda.html'));
});


app.get('/kayit.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/kayit.html'));
});


app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin.html'));
});

app.get('/portfolyo.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/portfolyo.html'));
});

// Sunucuyu başlatma
app.listen(PORT, () => console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`));
