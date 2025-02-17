**Proje Adı:** BlockQuest

**Proje Fikri:**
Bu web3 projesi, kullanıcıların testnet ortamında belirli görevleri tamamlayarak puan kazandıkları ve bu puanları belirli aşamalarda token'e dönüştürebildikleri bir ekosistem sunar. Kullanıcılar, sosyal medya entegrasyonları yaparak, belirlenen testnet işlemlerini gerçekleştirerek veya sistemdeki RAM ve depolama kaynaklarını paylaşıp testnet puanları biriktirebilirler. Bu sayede, gerçek bir blockchain ortamında kullanımın simüle edildiği basit bir sistem oluşturulur.

**Proje Gereksinimleri:**

1. **Genel Gereksinimler**
    - Web3 entegrasyonu (cüzdan bağlantısı, akıllı sözleşmeler)
    - Merkeziyetsiz kimlik doğrulama (OAuth, Web3Auth)
    - Kullanıcı dostu bir arayüz (UI/UX tasarım) - **Neubrutalism Style**
    - Mobil uyumluluk
    - Kullanıcı profili ve seviye sistemi
2. **Teknik Gereksinimler**
    - Akıllı sözleşme geliştirme (Solidity)
    - Testnet entegrasyonu (Ethereum Goerli, Polygon Mumbai)
    - Veritabanı yönetimi (Supabase)
    - Backend API (Supabase, GraphQL, REST)
    - Frontend framework (Next.js)
    - SDK entegrasyonu (Ethers.js, Web3.js)
3. **Kullanıcı Deneyimi**
    - Sosyal medya API entegrasyonu (Twitter, Discord, Telegram)
    - Kullanıcı görevleri (Tweet atma, testnet işlemi yapma, arkadaş daveti)
    - Puan toplama ve sıralama sistemi
    - Token dönüştürme mekaniği (staking, claim, airdrop)
    - Belirli seviyelerde NFT ödülleri
4. **Güvenlik ve Şeffaflık**
    - Akıllı sözleşmeler için audit mekanizması
    - Kullanıcı etkileşimleri için merkeziyetsiz veri kaydı (The Graph)
    - Anti-bot ve anti-fraud sistemleri
    - Kullanıcılara açık dashboard
5. **Ekstra Bileşenler - (İlk Aşamada olmayacak.)**
    - Kullanıcılar arası etkileşim mekanizmaları
    - Basit bir DAO entegrasyonu
    - Gelir modeli ve sürdürülebilirlik planı

**Tech Stack:**

- **Frontend:** Next.js
- **Backend:** Supabase, REST
- **Database:** Supabase
- **Smart Contracts:** Solidity
- **Web3 SDKs:** Ethers.js, Web3.js
- **Testnets:** Ethereum Goerli
- Wallet: WalletConnect- Wagmi
- UI Component : Tailwind