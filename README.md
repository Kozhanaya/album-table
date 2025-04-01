# Album Table
Небольшое приложение, которое загружает данные с тестового сервиса jsonplaceholder (возможно нужен будет VPN для работы) и отображает в виде таблицы.

Приложение состоит из следующих блоков:
- шапка с поиском
- блок с таблицей

В шапке имеется поле для ввода ID альбомов, который поддерживает множественный ввод через пробел, и кнопка "Поиск", при нажатии на которую отправляется запрос на API с учетом введенных ID альбомов. Если ID указаны, запрашиваются данные только этих альбомов, в противном случае, если поле пустое, запрашиваются все данные. Полученные данные также сохраняются в localStorage. При запуске приложения автоматически происходит поиск и отображение данных в таблице.  

В блоке с таблицей изначально отображаются 30 строк, и при прокрутке до конца блока подгружаются следующие 20 строк. Шапка таблицы прилипает к верхней части блока и видна при прокрутке. Все поля, полученные из API, отображаются в таблице как есть, в текстовом виде. При клике на ячейку шапки таблицы столбец сортируется по возрастанию/убыванию, количество рядов 30 как при изначальном отображении.

[Сслыка на демо](https://album-table.vercel.app/)

Стэк: Vue, Vite, Pinia, TailwindCSS

Сделала это приложение в качестве тестового задания, но мне обратную связь так и не дали. :)
