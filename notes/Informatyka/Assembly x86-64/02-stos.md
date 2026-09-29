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
