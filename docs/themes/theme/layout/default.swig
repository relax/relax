<!DOCTYPE html>
<html>
<head>
  <meta charSet='utf-8' />
  <title>{{config.title + ' - ' + page.title}}</title>
  <link rel='icon' type='image/png' href='{{ url_for("images/logo.png") }}' />
  <link href='{{ url_for("css/bootstrap.min.css") }}' rel='stylesheet'>
  <link href='{{ url_for("css/docs.css") }}' rel='stylesheet'>
  <link href='{{ url_for("css/font-awesome.min.css") }}' rel='stylesheet'>
  <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,300,700' rel='stylesheet' type='text/css'>
</head>
<body>
  <div class='menu'>
    <div class='wrapper'>
      <a href='/' class='logo'>
        <img src='{{ url_for("images/logo-white.png") }}' />
      </a>
      <nav class='links-nav'>
        {% for link in site.data.links %}
          <a href='{{link.link}}'>
            {{link.title}}
          </a>
        {% endfor %}
      </nav>
    </div>
  </div>
  <div class='page'>
    <div class='wrapper'>
      <div class='sidebar'>
        <nav class='menu-nav'>
          {% for section in site.data.nav %}
            <ul class='nav'>
              <span>{{ section.title }}</span>
              <ul class='nav'>
                {% for item in section.items %}
                  <li>
                    <a href='{{item.href || url_for(item.id + ".html") }}'{% if item.id == page.id %} class='active'{% endif %}>{{item.title}}</a>
                  </li>
                {% endfor %}
              </ul>
            </ul>
          {% endfor %}
        </nav>
      </div>
      <div class='page-content'>
        <div class='page-info'>
          <h1>{{page.title}}</h1>
          <a href="https://github.com/relax/relax/blob/master/docs/source/{{page.id}}.md">
            Edit this page
          </a>
        </div>
        {{page.content}}
      </div>
    </div>
  </div>
</body>
</html>
