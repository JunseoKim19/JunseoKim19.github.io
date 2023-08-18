---
title: "Junseo Kim - Me"
layout: gridlay
excerpt: "Junseo Kim: About Me"
sitemap: false
permalink: /team/
---

# Group Members

 **We are  looking for new PhD students, Postdocs, and Master students to join the team** [(see openings)]({{ site.url }}{{ site.baseurl }}/vacancies) **!**


Jump to [staff](#staff), [master and bachelor students](#master-and-bachelor-students), [alumni](#alumni), [administrative support](#administrative-support), [lab visitors](#lab-visitors).

## Staff
{% assign number_printed = 0 %}
{% for member in site.data.team_members %}

{% assign even_odd = number_printed | modulo: 2 %}

{% if even_odd == 0 %}
<div class="row">
{% endif %}

<div class="row">
  <div class="col-sm-6 clearfix">
    <img src="/images/teampic/junseo_kim.jpg" class="img-responsive" width="25%" style="float: left" />
    <h4>Junseo Kim</h4>
    <i>PhD student, University of XYZ</i>
    <ul style="overflow: hidden">
      <li>Education: Bachelor of Science in Physics, ABC University</li>
      <li>Education: Master of Science in Physics, DEF University</li>
    </ul>
  </div>
</div>

