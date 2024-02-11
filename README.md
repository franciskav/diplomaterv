# Diplomaterv - Tűz- és munkavédelmi nyilvántartórendszer fejlesztése

## Futtatás

### MongoDB adatbázis

MongoDB indítása:

```
brew services start mongodb-community
```

Ezután a MongoDB Compass programban csatlakozva a [mongodb://localhost:27017](mongodb://localhost:27017) címhez megtekinthetők a **test** adatbázis alatt a **collection**-ök

### Backend

Függőségek telepítése az alábbi parancs futtatásával **./diplomater/backend** könyvtárban:

```
npm i
```

Majd futtatás:

```
npm run dev
```

### Mobil

Függőségek telepítése a **./diplomaterv/frontend/mobil/RiskMaster** könyvtárból:

```
yarn &&
cd ./ios && pod install &&
cd ..
```

Futtatás iOS-en:

```
npx react-native run-ios
```

Futtatás Android-on:

```
npx react-native run-android
```
