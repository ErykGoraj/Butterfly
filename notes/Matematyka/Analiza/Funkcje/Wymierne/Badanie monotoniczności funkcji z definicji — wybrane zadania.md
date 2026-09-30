# Badanie monotoniczności funkcji z definicji — wybrane zadania

W tej lekcji przeanalizujemy na konkretnych przykładach, jak badać monotoniczność funkcji (czy funkcja jest rosnąca, czy malejąca) bezpośrednio z definicji.

---

## Przykład 1: Funkcja wymierna-wielomianowa

### Zadanie
Zbadaj monotoniczność funkcji $f(x) = \frac{3x}{x^2+1}$ w przedziale $x \in (-1, 1)$.

### Rozwiązanie krok po kroku

1. **Założenie początkowe:** 
   Niech $x_1, x_2 \in (-1, 1)$ będą takimi argumentami, że:
   $$x_1 < x_2$$
   Chcemy sprawdzić, czy zachodzi nierówność $f(x_1) < f(x_2)$ (co oznacza funkcję rosnącą).

2. **Podstawienie do wzoru:**
   $$\frac{3x_1}{x_1^2 + 1} < \frac{3x_2}{x_2^2 + 1}$$

3. **Mnożenie na krzyż i przekształcenia:**
   Ponieważ mianowniki $x^2 + 1$ są zawsze dodatnie dla dowolnych liczb rzeczywistych, możemy bezpiecznie pomnożyć nierówność na krzyż:
   $$3x_1(x_2^2 + 1) < 3x_2(x_1^2 + 1)$$
   Po podzieleniu przez 3 i sprowadzeniu wszystkiego na jedną stronę otrzymujemy:
   $$x_1 x_2^2 + x_1 - x_2 x_1^2 - x_2 < 0$$

4. **Grupowanie wyrazów i postać iloczynowa:**
   Grupujemy wyrazy i wyciągamy wspólny nawias:
   $$x_1 x_2 (x_2 - x_1) - 1(x_2 - x_1) < 0$$
   $$(x_2 - x_1)(x_1 x_2 - 1) < 0$$

5. **Analiza znaków:**
   * Pierwszy nawias $(x_2 - x_1)$ jest **dodatni**, ponieważ z założenia $x_1 < x_2$.
   * Aby cały iloczyn był mniejszy od zera ($< 0$), drugi nawias musi być ujemny:
     $$x_1 x_2 - 1 < 0 \implies x_1 x_2 < 1$$
   * Ponieważ oba argumenty należą do przedziału $(-1, 1)$, ich iloczyn $x_1 x_2$ zawsze spełnia ten warunek.

**Wniosek:** Skoro $f(x_1) < f(x_2)$, funkcja jest **ściśle rosnąca** w podanym przedziale.

---

## Przykład 2: Pułapka z ujemnym licznikiem i wspólnym mianownikiem

### Zadanie
Zbadaj monotoniczność funkcji $g(x) = \frac{-4}{x^2+3}$ w przedziale $x \in \langle 0, \infty)$.

### Rozwiązanie krok po kroku

1. **Założenie dla funkcji malejącej:**
   Niech $x_1 < x_2$ dla $x_1, x_2 \in \langle 0, \infty)$. Zakładamy początkowo $g(x_1) > g(x_2)$.

2. **Przeniesienie na jedną stronę i wspólny mianownik:**
   Zamiast mnożyć na krzyż przez ujemny licznik (co łatwo może pomylić znaki), przenosimy wszystko na lewą stronę:
   $$\frac{-4}{x_1^2 + 3} - \frac{-4}{x_2^2 + 3} > 0$$
   Po sprowadzeniu do wspólnego mianownika i redukcji wyrazów podobnych ($12$ i $-12$):
   $$\frac{4x_1^2 - 4x_2^2}{(x_1^2 + 3)(x_2^2 + 3)} > 0$$

3. **Zastosowanie wzoru skróconego mnożenia w liczniku:**
   $$\frac{4(x_1 - x_2)(x_1 + x_2)}{(x_1^2 + 3)(x_2^2 + 3)} > 0$$

4. **Badanie znaków wyrażenia:**
   * Mianownik $(x_1^2 + 3)(x_2^2 + 3)$ jest **zawsze dodatni**.
   * Liczba $4$ jest **dodatnia**.
   * Nawias $(x_1 + x_2)$ jest **dodatni** (bo argumenty są z przedziału $\langle 0, \infty)$).
   * Nawias $(x_1 - x_2)$ jest **ujemny** (bo z założenia $x_1 < x_2$).

5. **Wynik analizy:**
   Mnożenie znaków w liczniku daje $(+) \cdot (-) \cdot (+) = (-)$, co oznacza, że całe wyrażenie po lewej stronie jest **mniejsze od zera ($< 0$)**.

**Wniosek:** Otrzymany wynik (< 0) jest sprzeczny z początkowym założeniem $> 0$. Oznacza to, że funkcja ta w przedziale $\langle 0, \infty)$ w rzeczywistości **rośnie**, a nie maleje!

---

## Ćwiczenie do samodzielnego sprawdzenia

<details>
<summary>Pokaż podpowiedź do zadań z monotoniczności</summary>

Pamiętaj: zawsze gdy w liczniku ułamka masz liczbę ujemną, najbezpieczniej jest przenieść wyrażenie na jedną stronę, sprowadzić do wspólnego mianownika i zbadać znak całego licznika po rozpisaniu na czynniki.

</details>