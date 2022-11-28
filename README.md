# Rezka
Завантажуй фільми та серіали із сайту rezka.ag

>Щоб використовувати скрипт потрібно буде поставити розширення для браузера **Tampermonkey** ([Google](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo), [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/), [Opera](https://addons.opera.com/en/extensions/details/tampermonkey-beta/)) або **Greasemonkey** ([Firefox](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)), **Userscripts** ([Safari](https://apps.apple.com/ua/app/userscripts/id1463298887?l=ru))

⚠️ Також обов'язковим параметром є присутність [**ffmpeg**](https://ffmpeg.org/download.html) на комп'ютері. Завантажити його можна за цим посиланням (https://ffmpeg.org/download.html)
Інструкції:
- [Windows](https://www.wikihow.com/Install-FFmpeg-on-Windows)
- [Mac OS](https://bbc.github.io/bbcat-orchestration-docs/installation-mac-manual/)
- **рекомендую** [Brew](https://brew.sh/) (Windows, Mac OS, Linux) виконавши код у терміналі:
```ps
brew install ffmpeg
``` 
## Використання

Встановіть скрипт у розширення та використовуйте. У скрипті є налаштування (які треба змінювати всередині скрипта):
- `show_log = false` відображати логи в консоль, за замовчуванням відключено (false)
- `extension = 'm4v'` розширення, в яке буде збережено відео, можна змінити на 'mp4', за замовчуванням встановлено 'm4v'

> Є ще налаштування по завантаженню готового скрипту, який треба тільки запустити і автоматично піде завантаження фільму або серіалу. Працює не коректно
> - `download = false` включає завантаження готового скрипту, замість посилання з'явиться кнопка для завантаження серіалу, за замовчуванням відключено
> - `is_mac = true` перемикач між систем, true – Macos, false – Windows, за замовчуванням Macos – true. Впливає на завантаження файлу
