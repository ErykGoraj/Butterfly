# Stos i wywołania funkcji

Stos pomaga zapamiętać, skąd wywołano funkcję, oraz przechowywać jej dane robocze.

## Zasada LIFO

Ostatni element dodany na stos jest pierwszym zdejmowanym elementem — jak książka położona na szczycie stosu książek.

## Wskaźnik stosu

Rejestr `rsp` wskazuje aktualny szczyt stosu. W typowym kodzie x86-64 stos rośnie w kierunku niższych adresów.

```assembly
push rax
pop rbx
```

## Powiązane tematy

Wróć do [układu pamięci](01-pamiec.md#układ-pamięci-programu).

## Ćwiczenie: prześledź kolejność

Na początku `rax = 10`, a `rbx = 20`. Jakie wartości dostaną `rcx` i `rdx`?

```assembly
push rax
push rbx
pop rcx
pop rdx
```

<details>
<summary>Pokaż podpowiedź</summary>

Ostatnia wartość dodana na stos zostanie zdjęta jako pierwsza.

</details>

<details>
<summary>Pokaż rozwiązanie</summary>

`rcx = 20`, a `rdx = 10`. Najpierw zdejmujemy wartość z `rbx`, ponieważ trafiła na stos jako ostatnia.

</details>
