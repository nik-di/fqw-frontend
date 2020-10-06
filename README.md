# Final work on html and css at the web development course

<img src="https://img.shields.io/static/v1?label=ver&message=0.2.3&color=brightgreen">
<img src="https://img.shields.io/static/v1?label=webpack&message=4.43.0&color=blue">
<img src="https://img.shields.io/static/v1?label=build&message=passing&color=green">
<img src="https://img.shields.io/static/v1?label=build-size&message=1.65MB&color=informational">
<img src="https://img.shields.io/github/issues-pr-closed-raw/nik-di/fqw-frontend">
<img src="https://img.shields.io/website?url=https%3A%2F%2Fnews-explorer.website">

## [News Explorer](https://news-explorer.website/)

Ссылка на проект https://github.com/nik-di/fqw-frontend

#### О проекте:
__*Это сервис, в котором пользователь вводит в строку поиска ключевое слово, по которому хочет найти статьи.*__
##### Сайт состоит из двух страниц:
* Главная. Содержит только окно поиска.
* Страница с сохранёнными статьями. На ней отображаются новости, которые пользователь добавил в избранное.
Кроме этих страниц на сайте есть всплывающие окна (попапы):
* с формой регистрации нового пользователя;
* формой входа.
**Регистрация нужна, чтобы пользователь мог сохранить статьи в своём личном кабинете.**

#### Установка
##### Git command:
1. Скачать репозиторий:
```git clone https://github.com/nik-di/fqw-frontend.git```
> Для полного функционала также необходимо установить бэкенд. Инструкции по ссылке: → [Backend](https://github.com/nik-di/web-fqw-api)
2. Перейти в директорию с каталогом
```cd fqw-frontend/```
3. Установить npm-зависимости:
```npm i```
4. Произвести сборку проекта:
```npm run build```
5. Запустить проект на локальном сервере:
```npm run dev```

 
#### Впереди ещё много правок:
1. *Не работает ссылка на главную страницу в футере;* `Update: ✔`
2. *Поправить вёрстку кнопки авторизации. До авторизации, текст прижат к левой части кнопки;* `Update: ✔`
3. *Переписать мобильное меню: наблюдается некорректная работа, мобильное меню является отдельным блоком и логика реализована отдельным скриптом;*
4. *Реализовать более быстрый релокейт со траницы сохраненных статей, если не зарегестрированный пользователь перешёл по прямой ссылке;*
5. *Заполнить блок "О себе";*
6. *Попапы не закрываются при нажатии на "ESC";* `Update: ✔`
7. *Блокировать поля ввода и кнопку отправки формы во время запроса;*
8. *При удалении новости на странице сохраненных перезагружается вся страница. Изменить логику удаления без перезагрузки;* `Update: ✔`
9. *Защитить от XSS поля ввода форм. Как вариант SanitizeHtml;* `Update: ✔`
10. *При добавлении новости в сохраненные, маркер на кнопке устанавливается даже если запрос завершился с ошибкой. Добавить проверку на успешный результат;* `Update: ✔`
11. *Защитить от XSS данные приходящие с сервера.* `Update: ✔`

#### Благодарности:
* Денис [@zlocate](https://github.com/zlocate)
* Артём Евсяков [@SmilingJey](https://github.com/SmilingJey)
* Даниил [@coolswood](https://github.com/coolswood)
* Сергей [@Boortcore](https://github.com/Boortcore)
