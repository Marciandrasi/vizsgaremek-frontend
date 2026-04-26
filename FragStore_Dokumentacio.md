# PROJEKTMUNKA

## FragStore Gamer Webáruház

---

**Témavezető:** _______________________________

**Készítette:** 
- Név: _______________________________
- Osztály: _______________________________
- Iskola: Nyíregyházi Szakképzési Centrum Széchenyi István Technikum és Kollégium

**Nyíregyháza**
**2025**

---

# Tartalomjegyzék

- Feladat megadása .................................................................................................................... 2
- 1. Szereplők és igényeik ........................................................................................................... 2
- 2. Use-Case Funkció lista .......................................................................................................... 3
  - 2.1. Bejelentkezett felhasználó ............................................................................................... 3
  - 2.2. Látogató .......................................................................................................................... 3
  - 2.3. Adminisztrátor ................................................................................................................. 4
- 3. Magas szintű rendszerterv ................................................................................................... 5
- 4. Screnek ................................................................................................................................. 6
- 5. Modellek ................................................................................................................................ 8
- 6. Alkalmazások kiválasztása ................................................................................................... 11
  - 6.1. Front-end ..................................................................................................................... 11
  - 6.2. Backend ....................................................................................................................... 11
  - 6.3. Adatbázis .................................................................................................................... 12
  - 6.4. Tesztelés .................................................................................................................... 12
- 7. Routing ................................................................................................................................. 13
- 8. Middlewarek (algoritmusok) ............................................................................................... 17
- 9. Implementáció .................................................................................................................... 19
- 10. Tesztelés .............................................................................................................................. 20
- 11. Bevezetés, éles üzemmód ................................................................................................... 21
- 12. További fejlesztési lehetőségek ........................................................................................... 21

---

# Feladat megadása

Feladatunk egy alkalmazás készítése, amelyet több felhasználó fog használni. Online alkalmazásunkban a felhasználók gamer tematikájú termékeket vásárolhatnak, valamint szolgáltatásokat is igénybe vehetnek. Regisztráció nélkül is kereshet, olvashat az oldalon.

Az alkalmazásnak több fő feladat ellátásával kell megküzdenie: a vásárlók rendelésének feldolgozása, szolgáltatás megrendelése, az üzlet árukeszletének kezelése, és persze a számlázás. Mindezek webes felületen történnek meg.

---

# 1. Szereplők és igényeik

## Bejelentkezett felhasználó
- Legyen képes vásárolni a rögzített termékekből
- A kosár tartalmát megtekinteni, módosítani, megvásárolni
- Legyen képes saját adatait módosítani
- Rendelési előzményeit megtekinteni

## Látogató
- Tudjon böngészni
- Legyen képes regisztrálni
- Kosárba helyezni termékeket (regisztrációhoz kötve)

## Adminisztrátor
- Bejelentkezett felhasználók adatainak elérése
- Bejelentkezett felhasználók adatainak módosítása
- Bejelentkezett felhasználók adatainak törlése
- Termék adatok módosítása
- Termék adatok törlése
- Új termék felvétele

---

# 2. Use-Case Funkció lista

Az alkalmazásban a felhasználókat vagy vásárlókat két csoportra tudjuk osztani. Ezek a csoportok a látogató és a regisztrált vásárló vagy egyszerűen vásárló. A két csoport között a regisztráció tesz különbséget, így hiába a látogató és a vásárló is el tudja végezni ugyanazt a webáruházban, mégis van némi különbség a lehetőségek között.

## 2.1. Bejelentkezett felhasználó
- Böngészés
- A rögzített termékek között keresési lehetőség
- A rögzített termékek kilistázhatók kategória alapján
- Vásárlói 'kosár' használata
- Kijelentkezés
- Rendelési előzmények megtekintése

## 2.2. Látogató
- Böngészés
- A rögzített termékek között keresési lehetőség
- A rögzített termékek kilistázhatók kategória alapján
- Legyen képes regisztrálni (név, email, jelszó, lakcím)
- Legyen képes bejelentkezni

A látogató és a bejelentkezett vásárló is tud az oldalon a termékek és szolgáltatások között böngészni, termékek között váltani. Mindketten képesek keresni is az oldalon terméket, és tudják a termékeket kategóriánként kilistázni.

A látogatónak ha vásárlási szándéka van, előbb regisztrálnia kell, hogy a kosárba rakott termékeket megvásárolhassa. A regisztrációkor meg kell adnia bizonyos adatokat szállítással és számlázással kapcsolatban. A vásárló már nem regisztrálhat, mert regisztrált fiókkal rendelkezik.

Regisztráció után a látogató bejelentkezhet. Bejelentkezés után vásárlóként kezeljük a látogatót.

A regisztrált felhasználó tud terméket a kosárba helyezni, termék mennyiségét megadni.

Vásárolni és szolgáltatást igényelni csak a bejelentkezett felhasználó tud, mivel szükségesek a regisztrációkor megadott adatok.

Kijelentkezés lehetősége csak a bejelentkezés után érhető el, ezért kijelentkezni csak a vásárló tud bejelentkezés után bármikor.

## 2.3. Adminisztrátor
- Terméket adminisztrációs felületen lehet feltölteni, módosítani és törölni
- Az adminisztrációs felületet csak az adminisztrátor érheti el
- Listázni tudja a termékeket
- Felhasználókat tud törölni, módosítani, kilistázni
- Rendeléseket kezelni (státusz módosítás)

---

# 3. Magas szintű rendszerterv

**Rendszerterv**

A fejlesztés során a rétegzett architektúra (Layered Architecture) szemléletmódját figyelembevételével igyekeztünk elkülöníteni az adatok elérését és az üzleti logikát az adatok megjelenítésől és a felhasználói interakciótól. Ezzel biztosítjuk azt, hogy a felhasználói felület ne befolyásolja a kezelést, illetve az adatok a későbbi fejlesztések során, ha kell, könnyen átszervezhetők legyenek a felhasználói felület változtatása nélkül.

Az alkalmazás a következő rétegekből épül fel:
- **Frontend (Presentation Layer)**: React alkalmazás, amely a felhasználói felületet biztosítja
- **Backend (Business Logic Layer)**: Spring Boot alkalmazás, amely az üzleti logikát kezeli
- **Adatbázis (Data Access Layer)**: MySQL adatbázis, amely az adatok tárolását végzi

A kliens és szerver közötti kommunikáció REST API-n keresztül történik, JSON formátumban.

**MVC modell**

Az alkalmazás a Model-View-Controller (MVC) tervezési mintát követi:
- **Model**: Az adatbázis entitások (Entity-k) és DTO-k (Data Transfer Objects)
- **View**: A React komponensek és oldalak (JSX)
- **Controller**: A Spring Boot kontrollerek, amelyek fogadják a HTTP kéréseket

---

# 4. Screnek

Egy internetes alkalmazás készítésekor fontos több szempontot is figyelembe venni. A végeredmék olyan felhasználóknak készül, akikkel közvetlen kapcsolat nem áll fenn, így ha a felhasználó úgy érzi nem kapott kellő információt az oldalról, akkor lehet nem fog vásárolni, és vissza sem tér az oldalra. Ezért kiemelkedően fontos az oldal kinézetével és tartalmával kapcsolatban, hogy a látogatók bizalmát elnyerje, könnyen kezelhető és logikus felépítésű legyen. Minden információ egyértelmű legyen, például az elérhetőségek feltüntetése, a termékekről elég információ legyen feltüntetve, vagy például az árak ÁFA-val terheltek, vagy sem. Az ilyen alapvető adatok hiánya miatt a vásárló más boltat választhat.

**Kezdő képernyő terv**

A FragStore webáruház sötét, gamer stílusú felülettel rendelkezik, neon lila (#a855f7) kiemelőszínnel és Orbitron/Rajdhani betűtípusokkal. A kezdőképernyőn megjelennek a kiemelt termékek, a keresősáv és a navigációs menü.

A termékek megjelenítésénél kártyás elrendezést alkalmaztunk, amely jól áttekinthető és reszponzív. Minden termékkártyán megjelenik a termék képe, neve, ára és egy "Kosárba" gomb.

A tervezés szakaszában is egyértelmű volt, hogy a regisztrációs felülethez egy letisztult, egyszerű megjelenésű oldalt képzelünk el. A bejelentkezési és regisztrációs oldalak középpontjában a form mezők állnak, sötét háttérrel és neon kiemelésekkel.

---

# 5. Modellek

Az adatok tárolására több modellre is szükség van, úgy mint admin, regisztrált felhasználók, termékek, rendelések, kosár elemek.

## users {
- id (bigint, PK, auto_increment)
- username (varchar(50), unique)
- email (varchar(100), unique)
- password (varchar(255))
- first_name (varchar(50))
- last_name (varchar(50))
- address (varchar(255))
- phone (varchar(20))
- role (enum: USER, ADMIN)
- created_at (timestamp)
}

## products {
- id (bigint, PK, auto_increment)
- name (varchar(255))
- description (text)
- price (decimal(10,2))
- image_url (varchar(255))
- stock_quantity (int)
- created_at (timestamp)
}

## cart_items {
- id (bigint, PK, auto_increment)
- user_id (bigint, FK -> users.id)
- product_id (bigint, FK -> products.id)
- quantity (int)
- created_at (timestamp)
}

## orders {
- id (bigint, PK, auto_increment)
- user_id (bigint, FK -> users.id)
- total_amount (decimal(10,2))
- status (enum: PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
- shipping_address (varchar(255))
- created_at (timestamp)
}

## order_items {
- id (bigint, PK, auto_increment)
- order_id (bigint, FK -> orders.id)
- product_id (bigint, FK -> products.id)
- quantity (int)
- price_at_time (decimal(10,2))
- subtotal (decimal(10,2))
}

## tokens {
- id (bigint, PK, auto_increment)
- token (varchar(255))
- user_id (bigint, FK -> users.id)
- token_type (enum: VERIFICATION, PASSWORD_RESET)
- expiry_date (timestamp)
- created_at (timestamp)
}

---

# 6. Alkalmazások kiválasztása

## 6.1. Front-end

### React
A React az egyik nyílt forráskódú JavaScript könyvtár. Interaktív felhasználói felületek felépítésére szolgál. Ez egy hatékony, deklaratív és rugalmas könyvtár. A Model-View-Controller (MVC) V, azaz View elemével foglalkozik. Ez nem egy teljes keret, hanem csak egy előlapú könyvtár. Lehetővé teszi összetett felhasználói felületek létrehozását vagy elkészítését, összetevőkként ismert, elkülöníttet és apró kóddarabok felhasználásával.

### JavaScript
A JavaScript (röviden JS) egy objektumalapú scriptnyelv, amelyet elterjedten használnak weboldalakon, a web programozási nyelve. A JavaScript futásideje egyszálú, ami azt jelenti, hogy egyszerre csak egy darab kódot képes végrehajtani. Ennek a megoldására használunk async függvényeket és Promisokat.

### HTML
A HTML (Hypertext Markup Language) egy leíró nyelv, mellyet weboldalak elkészítésére használhatunk.

### Tailwind CSS
A Tailwind CSS egy utility-first CSS keretrendszer, amely előre definiált osztályokat biztosít a gyors fejlesztéshez. Lehetővé teszi egyedi dizájn kialakítását anélkül, hogy külön CSS fájlokat kellene írni.

### Axios
Az Axios egy könyvtár, amelyet HTTP-kérések küldésére használnak a böngészőből és Node.js platformon keresztül. Promise-alapú, könnyen kezelhető és támogatja a request/response interceptort.

### Vite
A Vite egy modern frontend build eszköz, amely rendkívül gyors fejlesztési élményt biztosít. Native ES modulokat használ a fejlesztés során, és Rollup-ot a production build-hez.

## 6.2. Backend

### Spring Boot
A Spring Boot egy nyílt forráskódú Java keretrendszer, amely megkönnyíti a production-ready, önállóan futtatható alkalmazások készítését. Beépített Tomcat szervert tartalmaz, és minimalizálja a konfigurációs szükségletet.

### Java
A Java egy objektumorientált programozási nyelv, amelyet széles körben használnak vállalati alkalmazások fejlesztésére. Platformfüggetlen, robusztus és nagy teljesítményű.

### Maven
A Maven egy build automation és projekt menedzsment eszköz Java projektekhez. Kezeli a függőségeket, build-eli a projektet és kezeli a projekt életciklusát.

### JWT (JSON Web Token)
A JWT egy kompakt, URL-biztos módja annak, hogy JSON objektumként továbbítsunk adatokat a felek között. Autentikációra és autorizációra használjuk.

### Spring Security
A Spring Security egy hatékony és testreszabható autentikációs és hozzáférés-vezérlési keretrendszer. JWT token-alapú autentikációt biztosít.

### Lombok
A Lombok egy Java könyvtár, amely automatikusan generálja a getter/setter metódusokat, konstruktorokat és egyéb boilerplate kódokat annotációk segítségével.

### JPA/Hibernate
A JPA (Java Persistence API) egy Java specifikáció az objektum-relációs leképezéshez (ORM). A Hibernate ennek egy implementációja, amely lehetővé teszi az adatbázis entitások Java objektumokként való kezelését.

## 6.3. Adatbázis

### MySQL
A MySQL egy rendkívül népszerű relációs adatbázis-kezelő rendszer. Nyílt forráskódú, megbízható és nagy teljesítményű. A Spring Boot alkalmazásunk JPA-n keresztül kommunikál vele.

### XAMPP (opcionális)
Egy platformfüggetlen webszerver-szoftvercsomag, azok számára, akik adatbázissal támogatott webszervert szeretnének üzemeltetni. Tartalmaz Apache-ot, MySQL-t és phpMyAdmin-t.

## 6.4. Tesztelés

### Postman
A Postman egy komplett eszköztár API fejlesztők számára. Olyan eszköz, amelyet az API-k megbízható teszteléséhez használhatunk. A Postman leegyszerűsíti az API életciklusának minden lépését, és egyszerűsíti az együttműködést.

### JUnit
A JUnit egy Java unit testing keretrendszer. A Spring Boot alkalmazás teszteléséhez használjuk, annotáció-alapú és egyszerűen használható.

---

# 7. Routing

A backend REST API végpontjai a következők:

## Autentikáció

**POST /api/auth/register**
- tervezett feladat: Új felhasználó regisztrálása
- bemenet: Felhasználónév, email, jelszó, név, cím, telefon
- kimenet: Sikeres regisztráció vagy hibaüzenet

**POST /api/auth/login**
- tervezett feladat: Autentikáció
- bemenet: Felhasználónév/email, jelszó
- kimenet: JWT token és felhasználói adatok (isAdmin)

**POST /api/auth/forgot-password**
- tervezett feladat: Elfelejtett jelszó
- bemenet: Email cím
- kimenet: Jelszó-visszaállítási link küldése

## Termékek

**GET /api/products**
- tervezett feladat: Összes termék kilistázása
- bemenet: -
- kimenet: Az összes termék listája

**GET /api/products/:id**
- tervezett feladat: Adott termék kilistázása
- bemenet: Termék azonosítója
- kimenet: Adott termék adatai

**POST /api/products**
- tervezett feladat: Új termék rögzítése (csak admin)
- bemenet: Termék adatai (név, leírás, ár, kép URL, készlet)
- kimenet: Visszajelzés a termék felvételének sikerességéről

**PUT /api/products/:id**
- tervezett feladat: Adott termék adatainak módosítása (csak admin)
- bemenet: Módosítandó adatok
- kimenet: Visszajelzés a módosítás sikerességéről

**DELETE /api/products/:id**
- tervezett feladat: Adott termék törlése (csak admin)
- bemenet: Termék azonosítója
- kimenet: Visszajelzés a törlés sikerességéről

**GET /api/products/search?query=xxx**
- tervezett feladat: Keresés kifejezés alapján
- bemenet: Kulcs kifejezés
- kimenet: Minden termék, amelynek a nevében vagy leírásában megtalálható a kifejezés

## Kosár

**GET /api/cart**
- tervezett feladat: Bejelentkezett felhasználó kosarának tartalmát kilistázza
- bemenet: JWT token (felhasználó azonosító)
- kimenet: Felhasználó kosara (termékek, mennyiségek, összeg)

**POST /api/cart**
- tervezett feladat: Termék hozzáadása a kosárhoz
- bemenet: Termék azonosítója, darabszáma
- kimenet: Visszajelzés a művelet sikerességéről

**PUT /api/cart/:cartItemId**
- tervezett feladat: Kosár elem mennyiségének módosítása
- bemenet: Mennyiség
- kimenet: Visszajelzés a művelet sikerességéről

**DELETE /api/cart/:cartItemId**
- tervezett feladat: Termék törlése a kosárból
- bemenet: Kosár elem azonosítója
- kimenet: Visszajelzés a művelet sikerességéről

**DELETE /api/cart/clear**
- tervezett feladat: Kosár ürítése
- bemenet: JWT token
- kimenet: Visszajelzés a művelet sikerességéről

## Rendelések

**GET /api/orders**
- tervezett feladat: Saját rendelések kilistázása
- bemenet: JWT token
- kimenet: A felhasználó rendeléseinek listája

**POST /api/orders**
- tervezett feladat: Rendelés leadása (checkout)
- bemenet: Szállítási cím, fizetési mód
- kimenet: Visszajelzés a rendelés sikerességéről

**GET /api/orders/admin/all**
- tervezett feladat: Összes rendelés kilistázása (csak admin)
- bemenet: JWT token (admin jogosultság)
- kimenet: Az összes rendelés listája

**PUT /api/orders/admin/:id/status**
- tervezett feladat: Rendelés státuszának módosítása (csak admin)
- bemenet: Új státusz (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
- kimenet: Visszajelzés a művelet sikerességéről

## Admin - Felhasználók

**GET /api/admin/users**
- tervezett feladat: Összes felhasználó kilistázása
- bemenet: JWT token (admin jogosultság)
- kimenet: A felhasználók listája, adataik

**GET /api/admin/users/:id**
- tervezett feladat: Adott felhasználó adatainak kilistázása
- bemenet: paraméterként kapott azonosító
- kimenet: Adott felhasználó adatai

**PUT /api/admin/users/:id**
- tervezett feladat: Felhasználó adatainak módosítása
- bemenet: Módosítandó adatok
- kimenet: visszajelzés a művelet sikerességéről

**DELETE /api/admin/users/:id**
- tervezett feladat: Töröl egy felhasználót azonosító alapján
- bemenet: Felhasználó azonosítója
- kimenet: A törölt felhasználó adatai vagy sikeres üzenet

---

# 8. Middlewarek (algoritmusok)

A Spring Security és a JWT token alapú autentikáció biztosítja a kérések hitelesítését és jogosultság-ellenőrzését.

## JWT Autentikációs Szűrő (JWT Authentication Filter)

Minden bejövő kéréshez ellenőrzi a Bearer token-t a header-ben:
- Kinyeri a tokent az Authorization header-ből
- Ellenőrzi a token érvényességét (signature, expiry)
- Betölti a felhasználó adatait a token-ből
- Beállítja a SecurityContext-et a hitelesített felhasználóval

## Jogosultság Ellenőrző (Authorization)

Az @PreAuthorize annotációk használatával korlátozzuk a hozzáférést:
- `@PreAuthorize("hasRole('ADMIN')")` - Csak admin férhet hozzá
- `@PreAuthorize("hasRole('USER')")` - Csak bejelentkezett felhasználó
- `permitAll()` - Nyilvános végpontok (regisztráció, login, termékek listázása)

## Hibakezelő Middlewarek

- **GlobalExceptionHandler**: Centralizált hibakezelés, egyedi kivételek kezelése
- **UserNotFoundException**: Ha a felhasználó nem található
- **ProductNotFoundException**: Ha a termék nem található
- **InvalidCredentialsException**: Hibás bejelentkezési adatok

## Kosár Kezelés Algoritmus

**addToCart(user, productId, quantity)**:
1. Ellenőrzi, hogy a termék létezik-e és van-e készleten
2. Ellenőrzi, hogy a felhasználónak van-e már ilyen termék a kosarában
3. Ha igen, növeli a mennyiséget
4. Ha nem, létrehoz új cart_item rekordot
5. Visszaadja a frissített kosár tartalmát

**updateCartItemQuantity(user, cartItemId, quantity)**:
1. Ellenőrzi, hogy a cart_item a felhasználóhoz tartozik-e
2. Ellenőrzi, hogy a mennyiség érvényes-e (1-1000)
3. Frissíti a mennyiséget
4. Visszaadja a frissített cart_item-et

## Rendelés Feldolgozás Algoritmus

**createOrder(user, shippingAddress, paymentMethod)**:
1. Lekéri a felhasználó kosarának tartalmát
2. Ellenőrzi, hogy a kosár nem üres
3. Ellenőrzi, hogy minden termék elérhető-e a kívánt mennyiségben
4. Kiszámítja a végösszeget
5. Létrehozza az Order rekordot
6. Létrehozza az OrderItem rekordokat a kosár elemek alapján
7. Csökkenti a termékek készletét
8. Üríti a kosarat
9. Visszaadja a létrehozott rendelést

---

# 9. Implementáció

Az implementáció a tervezést követő folyamat. A tervezés során megtörténik a feladatokra bontás, valamint az egyes feladatokban érintett funkcionalitás és szerkezet modellezése. Az implementáció során a modellekből készítünk működő, futtatható kódot.

A fejlesztés során az alábbi fő komponensek kerültek implementálásra:

## Backend (Spring Boot)

**Entitások (Entity)**:
- User, Product, CartItem, Order, OrderItem, Token

**Repository-k**:
- UserRepository, ProductRepository, CartItemRepository, OrderRepository, OrderItemRepository, TokenRepository
- JpaRepository-t extends, CRUD műveletekhez

**DTO-k (Data Transfer Object)**:
- RegisterRequest, LoginRequest, AuthResponse
- ProductDto, CartItemDto, CartItemRequest, OrderRequest, OrderResponse
- UserDto (admin felülethez)

**Service-ek**:
- AuthService: Regisztráció, bejelentkezés, token kezelés
- ProductService: Termékek CRUD műveletei
- CartService: Kosár kezelése
- OrderService: Rendelések kezelése
- AdminService: Admin műveletek

**Controller-ek**:
- AuthController: /api/auth/**
- ProductController: /api/products/**
- CartController: /api/cart/**
- OrderController: /api/orders/**
- AdminController: /api/admin/**

**Security konfiguráció**:
- SecurityConfig: CORS, CSRF, JWT filter konfiguráció
- JwtService: Token generálás, validálás
- JwtAuthFilter: Request szűrés, token ellenőrzés

## Frontend (React + Vite)

**Komponensek**:
- Navbar, Footer, ProductCard, CartItem
- LoadingSpinner, ErrorMessage

**Oldalak (Pages)**:
- Home, Products, ProductDetail
- Cart, Checkout
- Login, Register, ForgotPassword
- Orders, OrderDetail
- Admin: AdminDashboard, ManageProducts, ManageUsers, ManageOrders

**Service-ek**:
- api.js: Axios instance, interceptor-ök
- authService.js: Autentikációs API hívások
- productService.js: Termék API hívások
- cartService.js: Kosár API hívások
- orderService.js: Rendelés API hívások
- adminService.js: Admin API hívások

**Kontextusok**:
- AuthContext: Felhasználói állapot, login/logout
- CartContext: Kosár állapot, mennyiség

**Stílus**:
- Tailwind CSS konfiguráció: custom színek (neon purple #a855f7)
- Google Fonts: Orbitron (fejlécek), Rajdhani (szöveg)
- Custom CSS: Gamer stílus, animációk

---

# 10. Tesztelés

A felhasználó szempontjából a rendszer futtatásához elegendő bármely olyan operációs rendszer, amelyen futtatható HTML, CSS és Javascript technológiával készült alkalmazás megjelenítésére képes böngésző.

A fejlesztés alatt a rendszer tesztelése desktop eszközön több böngészőben (Google Chrome 120+, Mozilla Firefox 120+) Windows 11 operációs rendszer alatt történt. Továbbá mobil eszközön Android operációs rendszer alatt is teszteltük.

A szerveroldalról nézve a rendszernek szüksége van egy olyan platformra, ami MySQL szervereket képes futtatni, a fejlesztés során egy helyi localhost-ot aldottunk meg. A backend Spring Boot alkalmazás Java 17+ verziót igényel.

A feladat végrehajtása során folyamatosan jelen volt a tesztelés. Már a statikus oldal megtervezésekor és készülésekor tesztelve volt a megjelenés reszponzivitása, az olvashatóság, a láthatóság.

Az adatbázis tartalommal feltöltése után az oldal tartalmi része is tesztelve, ellenőrizve volt. Ezt Postman-ban valósítottuk meg, amely azonnali visszajelzést adott a fejlesztés sikerességéről, esetleges hibáiról. Ilyen volt például a felhasználók jelszavának tesztelése:

Új felhasználó felvétele esetén (POST kérés) a jelszót hasheljük. A fejlesztés során előre felvett felhasználónak például titkos jelszót adtunk meg, melyet átalakítottunk. Login page esetén a frontend beküldi az adatot, a backend lehashelí, és a lehashelt jelszó adott pillanatban egyezik az adatbázisból kivett userhez kötött jelszóval, akkor a felhasználót átengedi.

## Tesztelési esetek

### Autentikáció tesztelése
- **Regisztráció**: Valid és invalid adatokkal történő tesztelés
- **Bejelentkezés**: Helyes és helytelen jelszó, inaktív fiók
- **Token**: Lejárt token kezelése, újratöltés

### Termék kezelés tesztelése
- **Lista lekérés**: Összes termék, keresés, szűrés
- **Termék létrehozás**: Csak admin jogosultsággal működik
- **Termék módosítás**: Validációs szabályok ellenőrzése
- **Termék törlés**: Csak admin, kapcsolódó rendelések kezelése

### Kosár tesztelése
- **Kosárba helyezés**: Autentikációhoz kötött
- **Mennyiség módosítás**: 1-1000 közötti értékek
- **Törlés**: Egy elem, összes elem törlése

### Rendelés tesztelése
- **Checkout**: Üres kosárral, validációk
- **Státusz változtatás**: Csak admin módosíthatja

## Unit tesztek (JUnit)

A fejlesztés során JUnit tesztek is készültek, ahol az üzleti logika kritikus részei lettek tesztelve:
- Kosár számítások (összeg, mennyiség)
- Rendelés feldolgozás logika
- Jelszó hash-ek összehasonlítása
- DTO konverziók

---

# 11. Bevezetés, éles üzemmód

Az elkészült munka megtekintéséhez szükséges a következők telepítése:

## Követelmények

### Backend
- Java JDK 17 vagy újabb
- MySQL Server 8.0 vagy újabb
- Maven 3.8+

### Frontend
- Node.js 18+ és npm
- Modern böngésző (Chrome, Firefox, Edge)

### Adatbázis
- MySQL 8.0+
- phpMyAdmin (opcionális, ajánlott)

## Telepítési lépések

### 1. Adatbázis beállítása
- Telepítsd a MySQL szervert (pl. XAMPP segítségével)
- Hozz létre egy új adatbázist "fragstore" néven
- Importáld a fragstore.sql dump fájlt

### 2. Backend telepítése és indítása
- Nyisd meg a backend projektet IntelliJ IDEA-ban vagy Eclipse-ben
- Ellenőrizd az `application.properties` fájlban az adatbázis kapcsolatot:
```
spring.datasource.url=jdbc:mysql://localhost:3306/fragstore
spring.datasource.username=root
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
```
- Futtasd a Maven `clean install` parancsot
- Indítsd el a Spring Boot alkalmazást (DemoApplication.java)
- A backend elérhető: http://localhost:8080

### 3. Frontend telepítése és indítása
- Nyisd meg a frontend mappát Visual Studio Code-ban
- Nyiss egy terminált
- Telepítsd a függőségeket: `npm install`
- Indítsd el a fejlesztői szervert: `npm run dev`
- A frontend elérhető: http://localhost:5173

### 4. Termékképek beállítása
- Hozz létre egy `uploads` mappát a backend gyökerében
- Másold be a termékképeket ebbe a mappába
- Ellenőrizd, hogy a backend hozzáférjen a képekhez (SecurityConfig)

---

# 12. További fejlesztési lehetőségek

Az elkészített alkalmazás nem tökéletes, további javításokra és fejlesztésekre szorul.

Sajnálatos módon néhány funkció a fejlesztési idő rövidsége miatt nem kerülhetett bele a szoftverbe. Ilyen hiányosságok például:

- **Email értesítések**: Rendelés visszaigazolás, szállítási értesítés
- **Elfelejtett jelszó visszaállítás emailben**: Jelenleg csak adminon keresztül
- **HTTPS biztonságos kapcsolat**: SSL tanúsítvány telepítése
- **Fizetési integráció**: Stripe vagy PayPal kapcsolás
- **Termék értékelések**: Vásárlói vélemények, csillagos értékelés
- **Kedvencek/Wishlist**: Felhasználók menthetik a kívánságlistájukat
- **Szűrők és rendezés**: Ár szerint, név szerint, kategória szerint szűrés
- **Készletkezelés**: Alacsony készlet figyelmeztetés adminnak
- **Statisztikák**: Admin dashboard grafikonokkal, eladási statisztikák

A biztonság fejlesztése mellett a SEO (Search Engine Optimization) is nagy figyelmet évez, ugyanis a fejlesztés során fő szempont volt a több platformos megjelenés, viszont szintén az idő rövidsége miatt nincs megfelelően kereső optimalizálva az oldal.

---

# Összegzés

Az általunk fejlesztett REST API alkalmazás minden CRUD funkciót kihasználva mutatja be a kliens és szerver oldal közötti HTTP kommunikációt.

A fejlesztés során fontos szempont volt, hogy a jogkörök legyenek kezelve, admin és regisztrált felhasználó valamint látogató jogosultságainak elkülönítése az alkalmazás különböző rétegeiben.

A Spring Boot backend és React frontend kombinációja modern, skálázható és könnyen karbantartható megoldást biztosít. A JWT alapú autentikáció biztonságos, és a rétegzett architektúra tesztelhetővé teszi az alkalmazást.

---

**A teljes alkalmazás Git repository-ja:**
[Backend repo link ide]
[Frontend repo link ide]

---

**Készítette:**
Név: _______________________________
Osztály: _______________________________
Iskola: Nyíregyházi Szakképzési Centrum Széchenyi István Technikum és Kollégium

**Nyíregyháza, 2025**
