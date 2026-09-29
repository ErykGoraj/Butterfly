# 29–6. Gaz elektronowy i energia Fermiego

Elektrony w metalu nie zachowują się jak klasyczne cząstki gazu. Nawet przy temperaturze 0 K zajmują stany o różnych energiach. Kluczem do zrozumienia tego zjawiska jest zakaz Pauliego.

> **Po tej lekcji:** wyjaśnisz obsadzanie stanów przez elektrony, zdefiniujesz energię Fermiego i porównasz ją ze skalą energii cieplnej.

## 1. Model swobodnych elektronów

W modelu swobodnych elektronów pomijamy szczegóły periodycznego potencjału sieci i traktujemy elektrony przewodnictwa jak gaz poruszający się w objętości metalu.

To przybliżenie. Elektrony nadal podlegają mechanice kwantowej, a ich obsadzenia opisuje **statystyka Fermiego–Diraca**.

Model pomaga zrozumieć przewodzenie prądu i ciepła, ale nie zastępuje pełnej teorii pasmowej rzeczywistych materiałów.

## 2. Porównanie z gazem klasycznym

Dla klasycznego, nierelatywistycznego gazu doskonałego średnia energia kinetyczna ruchu postępowego wynosi:

> ⟨E<sub>k</sub>⟩ = 3/2 k<sub>B</sub>T.

**k<sub>B</sub>** to stała Boltzmanna. Formalna ekstrapolacja wzoru do T → 0 daje energię dążącą do zera. Nie oznacza to, że model klasyczny poprawnie opisuje rzeczywisty gaz przy dowolnie niskiej temperaturze.

W zdegenerowanym gazie elektronowym nie wolno utożsamiać 3/2 k<sub>B</sub>T ze średnią całkowitą energią kinetyczną elektronów.

## 3. Fermiony i spin

Fermiony mają spin połówkowy. Należą do nich elektrony, protony i neutrony.

Dla elektronu liczba kwantowa spinu wynosi **s = 1/2**, a rzut spinu na wybraną oś ma dwie możliwe wartości odpowiadające **m<sub>s</sub> = +1/2** i **−1/2**. Zapisujemy je umownie jako ↑ i ↓.

## 4. Zakaz Pauliego

> **Dwa identyczne elektrony nie mogą zajmować tego samego pełnego stanu jednocząstkowego.**

Do pełnego opisu należy także spin. Dlatego jeden stan przestrzenny może pomieścić dwa elektrony o przeciwnych spinach.

Nie należy tego mylić ze stwierdzeniem „na każdą wartość energii przypadają maksymalnie dwa elektrony”. Różne stany przestrzenne mogą mieć tę samą energię — mówimy wtedy o degeneracji.

## 5. Obsadzanie stanów w temperaturze 0 K

Elektrony zajmują dostępne stany od najniższych energii. Po zapełnieniu jednego stanu kolejne elektrony muszą korzystać z innych stanów.

```text
energia ↑

      stany puste
──────────────────  E_F
      stany zajęte
      stany zajęte
      stany zajęte
──────────────────  dno pasma / przyjęte zero energii
```

Przy T = 0 K stany poniżej granicy E<sub>F</sub> są zajęte, a stany powyżej — puste. Schemat nie przedstawia liczby stanów przypadających na każdą energię.

## 6. Energia Fermiego i poziom Fermiego

**Energia Fermiego E<sub>F</sub>** określa granicę zapełnienia stanów w temperaturze 0 K. W modelu swobodnych elektronów mierzymy ją względem dna pasma, czyli względem przyjętego zera energii kinetycznej.

Określenie **poziom Fermiego** stosuje się także do potencjału chemicznego μ(T). Przy T = 0 K μ = E<sub>F</sub>; przy temperaturze niezerowej te wielkości należy rozróżniać.

Dla miedzi w prostym modelu:

> **E<sub>F</sub> ≈ 7,0 eV**.

To nie jest energia każdego elektronu ani energia cieplna. Elektrony zajmują wiele różnych stanów aż do tej granicy.

## 7. Dlaczego energia nie znika przy 0 K?

Zakaz Pauliego uniemożliwia wszystkim elektronom zajęcie jednego najniższego stanu. Przy ustalonej liczbie elektronów część z nich musi zajmować stany o większej energii kinetycznej.

Nie oznacza to jednak przepływu prądu. W równowadze obsadzenia stanów o przeciwnych pędach równoważą się i prąd netto jest zerowy.

> **Wniosek:** niezerowa energia kinetyczna elektronów nie jest tym samym co uporządkowany przepływ ładunku.

## 8. Co zmienia ogrzewanie?

Podwyższenie temperatury rozmywa granicę obsadzenia. Niektóre elektrony tuż poniżej poziomu Fermiego przechodzą do stanów nieco powyżej niego.

```text
energia ↑

      część stanów obsadzona po ogrzaniu
──────────────────  okolice μ(T)
      część wolnych miejsc po wzbudzeniach
      głębsze stany prawie całkowicie zajęte
```

Przy k<sub>B</sub>T ≪ E<sub>F</sub> zmiany dotyczą głównie obszaru energetycznego o szerokości rzędu **kilku k<sub>B</sub>T** wokół potencjału chemicznego.

Głęboko położony elektron nie ma łatwo dostępnego pustego stanu nieco wyżej. Nie mówimy jednak, że wzbudzenie o kilka eV jest absolutnie niemożliwe: jest ono termicznie bardzo mało prawdopodobne przy rozważanych temperaturach.

## 9. Porównanie liczb: 300 K i 1200 K

Użyj:

> k<sub>B</sub> ≈ 8,617 × 10⁻⁵ eV/K.

| Temperatura | k<sub>B</sub>T — skala rozmycia | 3/2 k<sub>B</sub>T — klasyczna wartość porównawcza |
| --- | --- | --- |
| 300 K | 0,0259 eV | 0,0388 eV |
| 1200 K | 0,1034 eV | 0,1551 eV |

> **Poprawka do pierwotnej notatki:** przy 1200 K około 0,1 eV wynosi **k<sub>B</sub>T**, natomiast **3/2 k<sub>B</sub>T ≈ 0,155 eV**.

Dla miedzi przy 1200 K:

> k<sub>B</sub>T/E<sub>F</sub> ≈ 0,1034/7,0 ≈ **0,0148**.

Skala cieplna stanowi więc około 1,5% energii Fermiego. To porównanie skal, a nie dokładny procent wzbudzonych elektronów.

## 10. Rozkład Fermiego–Diraca

Dla T > 0 prawdopodobieństwo obsadzenia pełnego stanu jednocząstkowego o energii E wynosi:

> **f(E) = 1 / {exp[(E − μ)/(k<sub>B</sub>T)] + 1}**.

Funkcja **exp(x)** oznacza e do potęgi x. Dla E = μ otrzymujemy f(E) = 1/2.

- Znacznie poniżej μ obsadzenie jest bliskie 1.
- Znacznie powyżej μ jest bliskie 0.
- W granicy T → 0 rozkład staje się skokowy.

Funkcja mówi o prawdopodobieństwie obsadzenia **jednego stanu**, a nie bezpośrednio o liczbie elektronów w całym przedziale energii. Do tego potrzebna jest jeszcze gęstość stanów.

## 11. Zestawienie modeli

| Właściwość | Gaz klasyczny | Zdegenerowany gaz Fermiego |
| --- | --- | --- |
| Zakaz Pauliego w opisie | Nieuwzględniany | Uwzględniany |
| Średnia energia postępowa | 3/2 k<sub>B</sub>T | Nie jest równa 3/2 k<sub>B</sub>T |
| Granica T → 0 | Model klasyczny traci zastosowanie | Stany zapełnione do E<sub>F</sub> |
| Obsadzanie | Brak ograniczenia Pauliego | Jeden elektron na pełny stan, dwa na stan przestrzenny z dwoma spinami |
| Niewielkie ogrzanie | Klasyczna energia zależy od T | Zmiany obsadzeń głównie blisko μ |

## 12. Sprawdź się

### Ćwiczenie 1 — obsadzanie stanów

Masz trzy różne stany przestrzenne o rosnących energiach i pięć elektronów. Jak rozmieścisz je w stanie podstawowym, jeśli każdy stan przestrzenny dopuszcza dwa spiny?

<details>
<summary>Pokaż rozwiązanie</summary>

Pierwszy stan: **↑↓**, drugi: **↑↓**, trzeci: **↑** lub **↓**.

Najniższe stany są zapełniane najpierw. Dwa elektrony w tym samym stanie przestrzennym muszą mieć przeciwne spiny.

</details>

### Ćwiczenie 2 — skala cieplna

Oblicz k<sub>B</sub>T przy 600 K i porównaj z E<sub>F</sub> = 7,0 eV. Czy skale są porównywalne?

<details>
<summary>Pokaż rozwiązanie</summary>

k<sub>B</sub>T = 8,617 × 10⁻⁵ × 600 eV ≈ **0,0517 eV**.

Stosunek 0,0517/7,0 ≈ **0,00739**, czyli około 0,74%. Skala cieplna jest znacznie mniejsza od energii Fermiego.

</details>

## 13. Zapamiętaj

- Elektrony są fermionami i podlegają zakazowi Pauliego.
- Energia Fermiego nie jest energią cieplną ani energią każdego elektronu.
- Przy T = 0 K istnieją elektrony o niezerowej energii kinetycznej, ale nie wynika z tego prąd netto.
- Dla miedzi E<sub>F</sub> ≈ 7,0 eV, dużo więcej niż k<sub>B</sub>T w temperaturze pokojowej.
- Ogrzewanie zmienia obsadzenia głównie w pobliżu poziomu Fermiego.

Wróć do [wiązań w ciałach stałych](29-5-wiazania-w-cialach-stalych.md).

### Uzupełnienie

[Free Electron Model of Metals — OpenStax, Physics LibreTexts](https://phys.libretexts.org/Bookshelves/University_Physics/University_Physics_%28OpenStax%29/University_Physics_III_-_Optics_and_Modern_Physics_%28OpenStax%29/09%3A_Condensed_Matter_Physics/9.05%3A_Free_Electron_Model_of_Metals) — model gazu elektronowego i energia Fermiego miedzi.
