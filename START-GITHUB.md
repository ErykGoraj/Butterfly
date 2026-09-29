# Wgraj na GitHub — Butterfly KOL z kursami

## Aktualizacja istniejącej strony

1. Rozpakuj paczkę butterfly-kol-nauka-github.zip.
2. W swoim repozytorium zastąp index.html, styles.css, script.js, theme.js, package.json i folder scripts/. Dodaj lub zaktualizuj courses.js, learning.js i quiz.js. Zachowaj swój courses.json; nowe opcjonalne pola opisuje PORADNIK.md. Zaktualizuj też tests/ i .github/workflows/pages.yml. Folder vendor/ nadal jest potrzebny.
3. Zachowaj swoje pliki w notes/. Przykłady w paczce są opcjonalne — nie zastępuj nimi swoich notatek. Dopasuj courses.json do własnych ścieżek według KURSY.md.
4. Zapisz zmiany na main. GitHub Actions automatycznie przebuduje stronę. Po udanym wdrożeniu odśwież stronę; w razie starego wyglądu użyj Ctrl+Shift+R.

## Pierwsza publikacja

1. Wgraj całą zawartość rozpakowanej paczki do głównego katalogu repozytorium: index.html ma być bezpośrednio w katalogu głównym, nie w dodatkowym folderze.
2. Sprawdź obecność .github/workflows/pages.yml. Jeśli ukryty folder został pominięty, wybierz Add file → Create new file, wpisz tę ścieżkę i wklej zawartość pages.yml z paczki.
3. W Settings → Pages → Source wybierz GitHub Actions.
4. W Actions → Publish Butterfly KOL wybierz Run workflow. Po zakończeniu adres znajdziesz w Settings → Pages.

Gałąź domyślna w workflow to main. Zmień ją, jeśli korzystasz z innej. Nie wgrywaj ZIP-a jako pliku strony. Nie trzeba instalować Node ani bibliotek lokalnie: GitHub wykona build. dist/ i notes-manifest.json są generowane automatycznie i nie ma ich w tej paczce, żeby uniknąć powielania plików.

Lokalny podgląd (wymaga Node 22+): node scripts/serve.mjs, następnie http://127.0.0.1:4173. Nie otwieraj index.html dwuklikiem.

Pełna instrukcja dodawania lekcji, ćwiczeń, quizów i zarządzania: PORADNIK.md. Szablon lekcji: SZABLONY/lekcja.md. Własne notes/ oraz courses.json zachowaj — pliki w paczce są przykładami.
