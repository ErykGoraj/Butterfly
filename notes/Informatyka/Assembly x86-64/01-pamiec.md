# Pamięć w x86-64

Jak program w systemie Linux organizuje swoją pamięć? Poznaj podstawowe sekcje pliku wykonywalnego i zobacz, gdzie trafiają dane.

> **Cel nauki**
>
> Zrozumieć układ pamięci programu ELF i sprawdzić jego sekcje za pomocą `readelf`.

## Układ pamięci programu

Każda sekcja ma swoje zadanie. Kod, dane i pamięć robocza są rozdzielone, co ułatwia zarządzanie programem.

| Obszar | Przeznaczenie |
| --- | --- |
| `.text` | Instrukcje programu |
| `.data` | Zainicjalizowane zmienne |
| `.bss` | Zmienne inicjalizowane zerami |
| Sterta | Pamięć przydzielana dynamicznie |
| Stos | Lokalne dane i wywołania funkcji |

## Sekcja .data

Tutaj umieszczamy zmienne z określoną wartością początkową.

```assembly
section .data
    bNum db 123
    wNum dw 12345
    qNum dq 12345
```

## Sekcja .bss

Rezerwuje pamięć bez zapisywania wszystkich jej bajtów w pliku wykonywalnym.

```assembly
section .bss
    bvar resb 1
    dvar resd 1
    qvar resq 30000
```

## Sprawdzanie pliku ELF

```bash
readelf --file-header ./memory
readelf --symbols ./memory
```

Następny krok: [poznaj stos](02-stos.md). Możesz też wrócić do [układu pamięci](#układ-pamięci-programu).

## Ćwiczenie: wybierz sekcję

Masz dwie zmienne: `licznik` z wartością początkową 7 oraz bufor na 256 bajtów inicjalizowany zerami. Do jakich sekcji je przypiszesz?

<details>
<summary>Pokaż rozwiązanie</summary>

- `licznik` z wartością 7 → `.data`.
- Bufor inicjalizowany zerami → `.bss`.

```assembly
section .data
    licznik dq 7

section .bss
    bufor resb 256
```

`.bss` pozwala opisać potrzebny rozmiar bez zapisywania tych wszystkich zer w pliku wykonywalnym.

</details>
