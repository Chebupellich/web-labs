## Если вы это читаете, значит вы это читаете 
**Студент:** Левин Александр
**Группа:** ПрИ-21
**Вариант:** 9  (2, 4)

### Запросы для проверки маршрутов Postman
#### Маршруты событий
|Метод   |Маршрут   |Запрос   |
|---|---|---|
|GET|/events|http://localhost:5000/events<br>*json* **optional**<br>```{ "category": "концерт" }```|
|GET|/events/{id}|http://localhost:5000/events/1|
|POST|/events|http://localhost:5000/events<br>*json* <br> ```{ "title": "New Event", "description": "Description for new event", "date": "2025-03-15T14:00:00.000Z", "createdBy": 1 }```|
|PUT|/events/{id}|http://localhost:5000/events/1 <br>*json*<br>``` {"title": "Updated Event Title", "description": "Updated description for event", "date": "2025-04-01T16:00:00.000Z", "createdBy": 1 }```|
|DELETE|/events/{id}|http://localhost:5000/events/1|
---
#### Маршруты пользователей
|Метод   |Маршрут   |Запрос   |
|---|---|---|
|GET|/users|http://localhost:5000/users|
|POST|/users|http://localhost:5000/users<br>*json* <br> ```{ "name": "John Smith", "email": "john.smith@example.com" }```|
---
> Если вы это читаете, то вы однозначно дочитали Readme файл