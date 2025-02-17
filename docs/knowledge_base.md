# BlockQuest Knowledge Base

## Proje Kurulum Notları

### Next.js Kurulum
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Kurulum sırasında seçilen özellikler:
- TypeScript ✅
- Tailwind CSS ✅
- ESLint ✅
- App Router ✅
- src/ directory ✅
- Import alias (@/*) ✅

### Shadcn/ui Kurulum
Windows sistemlerde `npx shadcn-ui@latest init` komutu çalışmayabilir. Bu durumda manuel kurulum yapılmalıdır:

1. Gerekli bağımlılıkları yükle:
```bash
npm install @radix-ui/react-icons class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-dialog @radix-ui/react-slot
```

2. tailwind.config.js dosyasını güncelle
3. globals.css dosyasına Shadcn/ui stillerini ekle
4. components.json dosyasını oluştur

### Önemli Notlar
- Proje Next.js 14 üzerine kurulmuştur
- App Router kullanılmaktadır
- TypeScript strict mode aktiftir
- Tailwind CSS entegrasyonu hazırdır
- ESLint yapılandırması mevcuttur

### Hata Çözümleri
1. Next.js kurulum hatası durumunda:
   - Node.js'in güncel versiyonunu kullanın (18.17 veya üstü)
   - npm cache clear --force komutu ile önbelleği temizleyin
   - Gerekirse global node_modules'u temizleyin

2. TypeScript hataları için:
   - tsconfig.json dosyasını kontrol edin
   - node_modules/.cache klasörünü temizleyin
   - TypeScript versiyonunun Next.js ile uyumlu olduğundan emin olun

3. Shadcn/ui kurulum hataları için:
   - Windows sistemlerde npx shadcn-ui komutu çalışmayabilir
   - Manuel kurulum tercih edilmeli
   - Gerekli bağımlılıkları tek tek yükleyin
   - Konfigürasyon dosyalarını manuel olarak oluşturun