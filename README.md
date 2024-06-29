# Portfolyo Websitesi

Bu site, kişisel ve mesleki bilgilerinizi sunmak için tasarlanmış bir web uygulamasıdır. Ziyaretçilere sizin hakkınızda daha fazla bilgi edinme ve çalışmalarınızı gözden geçirme imkanı sağlar.

## Özellikler

- Hakkımda: Kişisel bilgilerim, eğitim geçmişim ve kariyer hedeflerim hakkında bilgi verir.
- Özgeçmiş: Eğitim ve iş deneyimlerimi detaylı olarak gösterir.
- Projeler: Katıldığım veya bireysel olarak geliştirdiğim projelerin tanıtımı ve açıklamaları.
- Yetenekler: Teknoloji, programlama dilleri ve diğer yeteneklerimi gösteren simgeler.
- İletişim: Benimle iletişime geçmek için gerekli bilgiler.

## Kullanılan Teknolojiler
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js, MongoDB Atlas

## Kurulum

1. Depoyu indirin veya klonlayın:
```bash
    git clone https://github.com/esmaozbalta/Portfolio-website.git <proje_adi>
```

2. Gerekli bağımlılıkları yükleyin:
```bash
    npm install
    npm install express
    npm install mongoose
```

4. Veri tabanını bağlayın:

Asağıdaki kodu kendi veri tabanı bilgilerinize göre güncelleyin.
```bash
mongodb+srv://<kullaniciadi>:<sifre>@cluster0.mongodb.net/<veritabaniadi>?retryWrites=true&w=majority
```

3. Projeyi çalıştırın:
```bash
    cd server
    node admin.js
```
Projeyi çalıştırdıktan sonra, çalışan server'ın PID (Process ID) numarasını görüntülemek için aşağıdaki komutu kullanabilirsiniz. 

Bu örnekte, server'ın 3000 numaralı port üzerinde çalıştığı varsayılmıştır:
```bash
    lsof -i :3000
```
Server'ı durdurmak (terminate etmek) için, yukarıdaki komutla bulduğunuz PID numarasını kullanarak aşağıdaki komutu çalıştırabilirsiniz. 
```bash
    kill -9 <PID>
```
![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)
