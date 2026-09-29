# Butterfly KOL — dodawanie i zarządzanie kursami

Nie musisz zmieniać JavaScriptu. Na co dzień edytujesz **pliki `.md` w `notes/`** oraz **`courses.json`**. GitHub sam buduje stronę po zapisaniu zmian na gałęzi `main`.

## 1. Najpierw bezpiecznie zaktualizuj swoją stronę

Wgraj nowe pliki strony z paczki i zastąp poprzednie wersje. Nowe pliki `learning.js` i `quiz.js` też są potrzebne. Zaktualizuj `scripts/`, `tests/` oraz `.github/workflows/pages.yml`.

**Zachowaj własny folder `notes/` i własny `courses.json`.** Dołączone wersje są przykładami. Jeśli masz już swoje kursy, dopisz do nich nowe pola opisane niżej; nie zastępuj swojej konfiguracji przykładową. Dotychczasowa konfiguracja bez quizów i celów nadal działa.

Nie wgrywaj folderu nadrzędnego paczki. `index.html`, `courses.json` i `notes/` mają znajdować się bezpośrednio w katalogu głównym repozytorium.

## 2. Utwórz lekcję na GitHub

1. Otwórz repozytorium, wybierz **Add file → Create new file**.
2. W nazwie wpisz `notes/CPP/01-zmienne.md`. GitHub utworzy foldery.
3. Wklej treść poniżej.
4. Kliknij **Commit changes** i zapisz na `main`.

````md
# Zmienne w C++

Po tej lekcji utworzysz zmienną przechowującą liczbę całkowitą.

## Przykład

```cpp
int wiek = 18;
```

`int` określa typ, `wiek` jest nazwą, a `18` wartością początkową.

## Ćwiczenie

Utwórz zmienną `punkty` z wartością 100.

<details>
<summary>Pokaż rozwiązanie</summary>

```cpp
int punkty = 100;
```

Używamy typu `int`, ponieważ przechowujemy liczbę całkowitą.

</details>
````

Puste linie przy `<details>` są ważne: oddzielają HTML od Markdown. Nie dodawaj `open`, jeśli rozwiązanie ma być początkowo ukryte. Możesz dodać osobny blok z napisem „Pokaż podpowiedź”. Gotowy szablon do kopiowania jest w **`SZABLONY/lekcja.md`** — skopiuj go do `notes/` i zmień nazwę oraz treść.

Po publikacji lekcja pojawi się w bibliotece. Następny krok przypisze ją do kursu.

## 3. Utwórz pierwszy kurs

Otwórz `courses.json` i wybierz **Edit** (ołówek). Jeśli zaczynasz od zera, możesz wkleić cały przykład poniżej. Musi istnieć lekcja `notes/CPP/01-zmienne.md` z poprzedniego kroku.

Jeśli masz już kursy, **nie zastępuj całego pliku**: dodaj nowy obiekt kursu wewnątrz istniejącej tablicy `courses`, po przecinku.

```json
{
  "courses": [
    {
      "id": "cpp-podstawy",
      "title": "C++ od podstaw",
      "description": "Pierwsze kroki w programowaniu.",
      "level": "Początkujący",
      "requirements": "Nie musisz znać programowania.",
      "outcomes": [
        "Utworzysz zmienną typu int.",
        "Rozpoznasz nazwę, typ i wartość zmiennej."
      ],
      "project": "Zapisz trzy deklaracje zmiennych opisujących wynik gracza.",
      "modules": [
        {
          "title": "Podstawy języka",
          "lessons": ["CPP/01-zmienne.md"],
          "quiz": [
            {
              "question": "Który zapis tworzy zmienną całkowitą?",
              "options": ["int punkty = 100;", "punkty int 100;"],
              "answer": 1,
              "explanation": "Najpierw podajemy typ int, potem nazwę i wartość początkową."
            }
          ]
        }
      ]
    }
  ]
}
```

To minimalny kurs demonstracyjny, który możesz rozwijać. Zapisz plik przez **Commit changes**.

## 4. Co oznaczają pola?

| Pole | Co wpisujesz |
| --- | --- |
| `id` | Stały identyfikator, np. `cpp-podstawy`. Małe litery a–z, cyfry i myślniki. Unikalny dla każdego kursu. |
| `title` | Tytuł widoczny na stronie. |
| `description` | Krótki opis kursu. |
| `level` | Np. Początkujący lub Średniozaawansowany. |
| `requirements` | Co uczeń powinien już wiedzieć lub mieć. |
| `outcomes` | Lista konkretnych umiejętności w sekcji „Czego się nauczysz”. Opcjonalna. |
| `project` | Treść zadania końcowego. Opcjonalna. Rozwiązanie możesz dodać w ostatniej lekcji. |
| `modules` | Lista modułów, w kolejności nauki. |
| `lessons` | Lista ścieżek do `.md`, w kolejności lekcji. |
| `quiz` | Pytania na koniec modułu. Opcjonalne; możesz usunąć całe pole. |

Ścieżka lekcji jest **bez `notes/`**. Wielkość liter i spacje muszą zgadzać się z plikiem. Wpisuj normalne spacje i polskie znaki — bez `%20`.

## 5. Dodaj kolejną lekcję lub moduł

Najpierw utwórz plik, np. `notes/CPP/02-warunki.md`. Następnie dopisz jego ścieżkę:

```json
"lessons": [
  "CPP/01-zmienne.md",
  "CPP/02-warunki.md"
]
```

Kolejność wpisów ustala przyciski poprzednia/następna. Możesz przeciągnąć lub przestawić linie w edytorze, zachowując przecinki. Nazwy plików nie narzucają kolejności w kursie.

Aby dodać moduł, dopisz do `modules` kolejny obiekt z `title` i `lessons`. Quiz danego modułu pojawi się pod jego ostatnią dostępną lekcją, a także pod rozwijanym przyciskiem w programie kursu.

## 6. Dodaj i sprawdzaj quizy

Każde pytanie ma `question`, co najmniej dwie różne odpowiedzi `options`, `answer` i `explanation`.

**`answer` to numer poprawnej odpowiedzi liczony od 1.** Jeśli poprawna jest druga odpowiedź, wpisz `2` jako liczbę, bez cudzysłowów. Każde pytanie ma jedną prawidłową odpowiedź.

Przykład kolejnego pytania do dopisania po przecinku w tablicy `quiz`:

```json
{
  "question": "Jaką wartość ma punkty po deklaracji int punkty = 100;?",
  "options": ["0", "100", "Nie określono"],
  "answer": 2,
  "explanation": "Wartość początkowa znajduje się po znaku równości."
}
```

Po publikacji zaznacz najpierw błędną odpowiedź i sprawdź wyjaśnienie, potem prawidłową. Puste odpowiedzi blokują sprawdzenie formularza. Przycisk „Spróbuj od nowa” czyści odpowiedzi i wynik.

Quizy są do samodzielnej nauki: wynik nie jest zapisywany i znika po opuszczeniu widoku lub odświeżeniu. Nie blokują ukończenia lekcji. Odpowiedzi są publiczne w plikach statycznej strony — to nie system egzaminacyjny.

## 7. Codzienne zarządzanie

| Chcesz… | Zrób to |
| --- | --- |
| Poprawić treść | Otwórz `.md`, kliknij Edit, zapisz Commit changes. |
| Zmienić tytuł lekcji | Zmień pierwszy nagłówek `#` w `.md`. |
| Dodać plik tylko do biblioteki | Dodaj go w `notes/`, nie dopisuj do kursu. |
| Użyć lekcji w dwóch kursach | Wpisz tę samą ścieżkę w obu kursach. Nie kopiuj pliku. |
| Usunąć lekcję tylko z kursu | Usuń wpis z `lessons`; pozostanie w bibliotece. |
| Usunąć lekcję całkowicie | Usuń `.md` oraz jej wpisy w `courses.json`. |
| Przenieść/zmienić nazwę pliku | Zmień ścieżki w `lessons` i linki w innych `.md`. |
| Usunąć kurs | Usuń jego obiekt z `courses`; pliki `.md` pozostają. |
| Nie mieć kursów | Ustaw `{"courses": []}`. Biblioteka nadal działa. |

Nie zmieniaj `id` kursu ani ścieżek lekcji bez potrzeby. Postęp jest powiązany z tymi wartościami. Zmiana samej treści nie zeruje ukończenia. Zakładki są powiązane ze ścieżką pliku; przeniesiony plik trzeba zapisać ponownie.

## 8. Sprawdź publikację

Po zmianach otwórz **Actions**. Workflow **Publish Butterfly KOL** musi zakończyć się zielonym znacznikiem. Następnie odśwież stronę. Jeżeli wygląd jest stary, użyj Ctrl+Shift+R.

Przed udostępnieniem nowego kursu:

1. Otwórz program i sprawdź kolejność.
2. Przejdź każdą lekcję i wykonaj ćwiczenie.
3. Rozwiń rozwiązanie; sprawdź kod i linki.
4. Sprawdź quiz błędnymi i poprawnymi odpowiedziami.
5. Otwórz stronę na telefonie.

Jeżeli Actions jest czerwone, otwórz nieudany krok. Generator podaje błąd z nazwą kursu/modułu. Najczęstsze przyczyny: brak przecinka, końcowy przecinek, powtórzone `id`, powtórzona lekcja w tym samym kursie albo `answer` poza zakresem. JSON nie obsługuje komentarzy `//`.

Nieistniejące ścieżki lekcji są pomijane z ostrzeżeniem. Pusty kurs nie jest publikowany. Jeśli kurs zniknął, sprawdź dokładne nazwy plików. Nie poprawiaj ręcznie manifestu ani `dist/` — są generowane automatycznie.

## 9. Co może ustawić uczeń?

- „Zapisz na później” w lekcji dodaje ją do Zakładek; nie oznacza ukończenia.
- „Oznacz jako ukończoną” zapisuje postęp danego kursu; można go cofnąć.
- Przycisk wyglądu w nagłówku otwiera palety, jasność, rozmiar i szerokość tekstu.

Postęp, zakładki i ustawienia są lokalne dla przeglądarki, bez konta i synchronizacji. Wyczyszczenie danych strony je usuwa. Zapis może być blokowany w ustawieniach przeglądarki; wtedy postęp i zakładki działają tylko do odświeżenia.

## 10. Podgląd lokalny (opcjonalny)

Do edycji przez GitHub nie potrzebujesz niczego instalować. Jeśli pracujesz na komputerze, użyj Node.js 22+:

```sh
node scripts/serve.mjs
```

Otwórz http://127.0.0.1:4173. Po zmianie źródeł wykonaj w drugim terminalu `node scripts/build.mjs` i odśwież stronę. Nie uruchamiaj strony dwuklikiem `index.html`.

**Na początek:** zrób lekcję o zmiennych z punktu 2, dopisz kurs z punktu 3, potem rozbuduj go o jedną własną lekcję. To cały podstawowy sposób pracy.
