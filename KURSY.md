# Kursy w Butterfly KOL

Biblioteka i kursy korzystają z tych samych plików w notes/. Nie kopiuj notatek do osobnego katalogu kursów.

## Dodawanie kursu

Edytuj courses.json w głównym katalogu repozytorium. W tablicy courses dodaj obiekt:

```json
{
  "id": "cpp-podstawy",
  "title": "C++ od podstaw",
  "description": "Pierwsze kroki w programowaniu w C++.",
  "level": "Początkujący",
  "requirements": "Nie musisz znać programowania.",
  "modules": [
    {
      "title": "Start",
      "lessons": [
        "C++/01-wprowadzenie.md",
        "C++/02-zmienne.md"
      ]
    }
  ]
}
```

Ścieżki w lessons są względem notes/, bez prefiksu notes/. Muszą odpowiadać nazwom plików, w tym wielkości liter. Wpisuj zwykłe spacje i polskie znaki, bez kodowania URL. Kolejność modułów i wpisów lessons jest kolejnością nauki. Ta sama notatka może należeć do kilku kursów, ale nie może powtarzać się wewnątrz jednego kursu.

id musi być unikalne i zawierać tylko małe litery a–z, cyfry oraz myślniki. Nie zmieniaj go po publikacji bez potrzeby: stan postępu jest przypisany do id kursu i ścieżki notatki. Zmiana ścieżki oznacza nową lekcję; sama edycja treści nie zeruje postępu.

## Publikacja i usuwanie

Commit plików .md i courses.json na main uruchamia testy, generowanie manifestu i publikację GitHub Pages. Nowa notatka pojawia się automatycznie w bibliotece. Aby weszła do kursu, dodaj jej ścieżkę w lessons. Samo umieszczenie notatki w folderze nie przypisuje jej automatycznie do kursu.

Usunięte pliki są pomijane w programie kursu, a ostrzeżenie pojawia się w logu Actions. Puste moduły i kursy nie są publikowane. Warto usunąć nieaktualne ścieżki także z courses.json. Błędny JSON, powtórzone id lub lekcje zatrzymują build z komunikatem — popraw konfigurację i wyślij commit ponownie. Brak courses.json albo {"courses": []} daje pustą sekcję kursów i działającą bibliotekę.

## Nauka

Kursy mają opis, wymagania, moduły, program oraz przycisk Rozpocznij/Kontynuuj. Lekcje oznacza się jako ukończone ręcznie; oznaczenie można cofnąć. Kontynuacja otwiera ostatnio odwiedzoną nieukończoną lekcję lub pierwszą pozostałą. Po ukończeniu wszystkich lekcji można powtórzyć kurs bez zerowania postępu.

Postęp zapisuje się w localStorage w tej przeglądarce. Nie ma kont, synchronizacji między urządzeniami ani certyfikatów. Przy blokadzie zapisu działa tylko w pamięci otwartej strony. Skasowanie danych przeglądarki usuwa postęp.

W kursie poprzednia/następna prowadzi wyłącznie w obrębie jego programu. TOC i link do innej lekcji tego samego kursu zachowują kontekst. Link do notatki spoza kursu otwiera ją w bibliotece. Wyszukiwarka przeszukuje całą bibliotekę i jej wyniki otwierają zwykłe notatki.

Dołączony kurs „Pamięć programu od podstaw” jest krótkim przykładem konfiguracji, nie kompletnym kursem Assembly. Zastąp go własnym programem.

Nowe funkcje: cele kursu (outcomes), zadanie końcowe (project), quizy modułów (quiz) i ćwiczenia z rozwiązaniami w Markdown. Przykłady i instrukcje krok po kroku: PORADNIK.md. Starszy courses.json nadal działa bez tych opcjonalnych pól.
