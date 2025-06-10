# Projekt z Systemów Baz Danych (MySQL + NestJS)

## 1. Wymagania funkcjonalne

- [ ] Lista funkcji dostępnych dla użytkownika.
- [ ] Opis operacji CRUD.
- [ ] Scenariusze użytkownika.

## 2. Wymagania niefunkcjonalne

- [ ] Rozmiar początkowy bazy danych.
- [ ] Zakładany przyrost danych.
- [ ] Wymagania dotyczące wydajności.

## 3. Role i uprawnienia

- [ ] Lista ról użytkowników.
- [ ] Opis uprawnień dla każdej roli.
- [x] Implementacja kontroli dostępu.

## 4. Pozostałe elementy analizy aplikacji

- [ ] Kontekst działania aplikacji.
- [ ] Założenia technologiczne.

## 5. Diagram encji (ERD)

- [x] Model encji i relacji.
- [x] Klucze główne i obce.

## 6. Założenia dotyczące bazy danych

- [ ] Normalizacja do 3NF.
- [ ] Strategie indeksowania.

## 7. Przewidywane obiekty PL/SQL (MySQL odpowiedniki)

- [ ] Procedury
- [ ] Funkcje
- [x] Wyzwalacze

### PS2 Kursory

- [ ] Przykładowa procedura z kursorem.

### PS3 Funkcje i procedury

- [ ] Min. 1 funkcja.
- [ ] Min. 1 procedura.

### PS4 Pakiety _(nie dotyczy MySQL)_

- [ ] Ewentualne odwzorowanie w NestJS jako moduły.

### PS5 Obsługa i propagacja wyjątków

- [ ] Obsługa błędów SQL.
- [x] Obsługa błędów w kodzie NestJS.

### PS6 Wyzwalacze

- [x] Min. 1 trigger w bazie danych.

## 8. Skrypt tworzący bazę danych / migracje

- [x] Plik SQL lub migracje TypeORM.

## 9. Użycie ORM-u

- [x] Definicja modeli.
- [x] Relacje i migracje.

## 10. API webowe

- [x] Endpointy REST dla encji.
- [ ] Kontrolery i serwisy w NestJS.

## 11. Dobre praktyki

- [x] Separacja warstw.
- [x] Wzorce projektowe.

## 12. Role w systemie

- [x] Middleware/Guards w NestJS.

## 13. Uwierzytelnianie użytkowników

- [x] JWT / sesje.
- [x] Logowanie i rejestracja.

## 14. Bezpieczeństwo

- [x] Haszowanie haseł.
- [x] Walidacja danych wejściowych.
- [x] SQL Prepared Statement
- [x] Sesja użytkownika weryfikowana na podstawie JWT z zapisem do bazy danych z możliwością uniważnienia.
- [x] Mechanizm odświeżania JWT (access_token exp. 15m, refresh_token exp. 30m).

## 15. Duża ilość danych

- [ ] Skrypt ładujący przykładowe dane.
- [ ] Testy na większym zbiorze danych.

## 16. Analiza planów zapytań (przed optymalizacją)

- [ ] EXPLAIN SELECT.
- [ ] Opis problemów.

## 17. Analiza planów zapytań (po optymalizacji)

- [ ] EXPLAIN SELECT.
- [ ] Wnioski.

## 18. Indeksy

- [x] Min. 2 indeksy.
- [ ] Opis zastosowania.

## 19. Przeformułowanie zapytań

- [ ] Przed i po optymalizacji.

## 20. Prezentacja działania aplikacji

- [x] Demo.

## 21. Przygotowanie na pytania

- [x] Znajomość decyzji projektowych.

## 22. Paginacja

- [ ] Implementacja w zapytaniach SQL i endpointach.

## 23. Testy

- [ ] Testy integracyjne/E2E.
- [x] Połączenie z bazą testową.

## 24. Skrypt zasilający bazę danymi

- [x] Osobny plik z insertami lub Faker.js.

# Kroki przed i po testowaniu

## -- nie dodawać indeksów do kolumn które często będą używane w WHERE.
