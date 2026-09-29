# 29–4. Widma molekularne

Dlaczego widmo cząsteczki jest bardziej złożone niż widmo atomu? Oprócz zmian stanów elektronowych cząsteczka może obracać się i drgać. W tej lekcji połączysz te trzy rodzaje ruchu z widmem promieniowania.

> **Po tej lekcji:** rozpoznasz przejścia elektronowe, obrotowe i drganiowe, obliczysz energię fotonu oraz wyjaśnisz energię punktu zerowego.

## 1. Energia fotonu i przejścia między stanami

Gdy atomy tworzą cząsteczkę, oddziaływania między jądrami i elektronami zmieniają dozwolone stany elektronowe. Energia cząsteczki może zmienić się wskutek pochłonięcia lub emisji fotonu.

- **Absorpcja:** cząsteczka pochłania foton i przechodzi do stanu o większej energii. Nie musi zaczynać od stanu podstawowego.
- **Emisja:** cząsteczka przechodzi do stanu o mniejszej energii i emituje foton.

> **Energia fotonu**
>
> E<sub>γ</sub> = hf = hc/λ = |E<sub>końcowy</sub> − E<sub>początkowy</sub>|

Symbole: **h** — stała Plancka, **f** — częstotliwość promieniowania, **c** — prędkość światła, **λ** — długość fali.

Do obliczeń w elektronowoltach przydaje się przybliżenie:

> hc ≈ 1240 eV·nm, więc E<sub>γ</sub> [eV] ≈ 1240 / λ [nm].

## 2. Trzy skale energii

| Rodzaj przejścia | Co zmienia się w cząsteczce? | Typowy zakres promieniowania |
| --- | --- | --- |
| Elektronowe | Stan elektronów | Światło widzialne i nadfiolet |
| Drganiowe | Drgania atomów względem siebie | Podczerwień |
| Obrotowe | Ruch obrotowy cząsteczki | Mikrofale i daleka podczerwień |

Zwykle odstępy energetyczne spełniają hierarchię:

> ΔE<sub>elektronowe</sub> ≫ ΔE<sub>drganiowe</sub> ≫ ΔE<sub>obrotowe</sub>.

To porównanie **typowych odstępów między poziomami**, a nie uniwersalna nierówność wszystkich możliwych energii stanów. Przejścia elektronowe często mają energie rzędu 1–10 eV; skale drganiowe i obrotowe zależą od cząsteczki.

## 3. Dlaczego powstają pasma?

W przybliżeniu każdy stan elektronowy ma własną strukturę poziomów drganiowych, a każdy stan drganiowy — strukturę poziomów obrotowych:

```text
stan elektronowy
  └── poziomy drganiowe
        └── poziomy obrotowe
```

Przejście elektronowe może więc towarzyszyć zmianie drgań i obrotów. Powstaje wiele blisko położonych linii. Ich grupy tworzą **pasma widmowe**; przy odpowiedniej rozdzielczości część z nich można rozdzielić na pojedyncze linie.

> **Zastosowanie:** charakterystyczne widmo pomaga rozpoznać cząsteczkę i badać jej strukturę.

## 4. Model sztywnego rotatora

Rozważ cząsteczkę dwuatomową obracającą się wokół środka masy. W modelu sztywnego rotatora długość wiązania jest stała.

Klasycznie energia obrotu wynosi:

> E<sub>rot</sub> = L²/(2I).

**L** oznacza wartość momentu pędu, a **I** — moment bezwładności. Kwantowo:

> L² = l(l + 1)ℏ², gdzie l = 0, 1, 2, … oraz ℏ = h/(2π).
>
> **E<sub>l</sub> = l(l + 1)ℏ²/(2I)**

Zachowujemy oznaczenie **l** z notatek; w spektroskopii często spotkasz zamiast niego **J**.

| l | Energia E<sub>l</sub> |
| --- | --- |
| 0 | 0 |
| 1 | ℏ²/I |
| 2 | 3ℏ²/I |
| 3 | 6ℏ²/I |

Poziomy nie są równomiernie oddalone. Odstępy między kolejnymi poziomami rosną.

## 5. Przejścia obrotowe i ich ograniczenia

Dla elektrycznych przejść dipolowych sztywnego rotatora obowiązuje reguła **Δl = ±1**. Przy absorpcji ze stanu l do l + 1:

> ΔE = E<sub>l+1</sub> − E<sub>l</sub> = **(l + 1)ℏ²/I**.

Energia ta musi być równa energii fotonu: ΔE = hf = hc/λ.

> **Ważne rozróżnienie:** posiadanie poziomów obrotowych nie oznacza, że każde przejście będzie widoczne w absorpcji dipolowej. Czyste widmo obrotowe tego typu wymaga trwałego momentu dipolowego. CO go ma, natomiast H₂ i N₂ go nie mają. Ich rotację można badać innymi metodami, np. spektroskopią Ramana.

W idealnym modelu energie **kolejnych poziomów** nie są równoodległe, ale częstotliwości **kolejnych dozwolonych linii absorpcyjnych** są równoodległe: f<sub>l→l+1</sub> = (l + 1)ℏ²/(Ih).

## 6. Moment bezwładności i długość wiązania

Dla dwóch atomów:

> I = m₁r₁² + m₂r₂² = μr²,
>
> μ = m₁m₂/(m₁ + m₂), a r = r₁ + r₂.

**μ** to masa zredukowana; **r₁** i **r₂** to odległości atomów od środka masy, a **r** — odległość między jądrami.

Jeżeli znasz numer przejścia i jego energię, możesz wyznaczyć I, a następnie:

> r = √(I/μ).

Dla CO długość wiązania jest w przybliżeniu równa **1,13 × 10⁻¹⁰ m = 0,113 nm**. Sama informacja o długości fali, bez rozpoznania przejścia, nie wystarcza do jednoznacznego zastosowania wzoru.

## 7. Drgania: model oscylatora harmonicznego

Przy niewielkich odchyleniach od długości równowagi wiązanie przypomina sprężynę:

> E<sub>p</sub> = ½kx²,
>
> f<sub>vib</sub> = (1/2π)√(k/μ).

**k** to stała siłowa wiązania, **x** — zmiana odległości między jądrami względem równowagi. Większe k oznacza sztywniejsze wiązanie.

Dozwolone energie to:

> **E<sub>n</sub> = (n + ½)hf<sub>vib</sub>**, gdzie n = 0, 1, 2, …

| n | Energia |
| --- | --- |
| 0 | ½hf<sub>vib</sub> |
| 1 | 3/2 hf<sub>vib</sub> |
| 2 | 5/2 hf<sub>vib</sub> |
| 3 | 7/2 hf<sub>vib</sub> |

W tym modelu poziomy drganiowe są **równoodległe**: ΔE = hf<sub>vib</sub>.

## 8. Energia punktu zerowego i absorpcja w podczerwieni

Najniższa energia drgań nie jest zerowa:

> **E₀ = ½hf<sub>vib</sub>** — energia punktu zerowego.

W przybliżeniu harmonicznym i dipolowym dozwolone są przejścia **Δn = ±1**. Drganie jest aktywne w podczerwieni, jeśli zmienia moment dipolowy cząsteczki.

Rzeczywiste wiązania są anharmoniczne. Przy wyższych energiach odstępy nie są idealnie jednakowe, a słabe przejścia nadtonowe mogą stać się możliwe.

## 9. Przykład liczbowy: skala energii drgań

Dla długości fali **λ = 2300 nm**:

> ΔE ≈ 1240/2300 eV ≈ **0,54 eV**.

Jeżeli jest to odstęp sąsiednich poziomów idealnego oscylatora:

> E₀ = ½ΔE ≈ **0,27 eV**.

W pierwotnej notatce przykład przypisano H₂. Tutaj traktujemy go jako obliczenie skali energii: H₂ nie wykazuje zwykłego elektrycznego dipolowego widma drganiowego, więc nie należy przedstawiać tej liczby jako przykładu silnej absorpcji dipolowej wodoru. Możliwe są słabsze przejścia i inne metody obserwacji.

## 10. Sprawdź się

### Ćwiczenie 1 — poziomy obrotowe

Dla pewnego rotatora ℏ²/I = 2 meV. Oblicz E₂ i energię przejścia l = 2 → 3.

<details>
<summary>Pokaż rozwiązanie</summary>

E₂ = 3ℏ²/I = **6 meV**.

ΔE₂→₃ = (2 + 1)ℏ²/I = **6 meV**. Energia poziomu i energia przejścia oznaczają różne rzeczy; w tym przykładzie mają taką samą wartość.

</details>

### Ćwiczenie 2 — foton i stan podstawowy

Odstęp sąsiednich poziomów harmonicznych odpowiada λ = 3100 nm. Wyznacz odstęp energetyczny i energię punktu zerowego.

<details>
<summary>Pokaż rozwiązanie</summary>

ΔE ≈ 1240/3100 = **0,40 eV**. Energia punktu zerowego E₀ = ΔE/2 = **0,20 eV**.

</details>

## 11. Zapamiętaj

- Widma cząsteczek łączą strukturę elektronową, drganiową i obrotową.
- Rotator: E<sub>l</sub> = l(l + 1)ℏ²/(2I).
- Oscylator: E<sub>n</sub> = (n + ½)hf<sub>vib</sub>.
- Reguły wyboru zależą od mechanizmu oddziaływania ze światłem; nie są bezwarunkowe.
- Energia punktu zerowego drgań wynosi ½hf<sub>vib</sub>.

Dalej: [Wiązania w ciałach stałych](29-5-wiazania-w-cialach-stalych.md).

### Uzupełnienie

[Molecular Spectroscopy — S. M. Blinder, Chemistry LibreTexts](https://chem.libretexts.org/Bookshelves/Physical_and_Theoretical_Chemistry_Textbook_Maps/Quantum_Chemistry_%28Blinder%29/01%3A_Chapters/1.13%3A_Molecular_Spectroscopy) — warunki aktywności drgań w podczerwieni i modele poziomów.
