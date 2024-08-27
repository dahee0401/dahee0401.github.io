"use strict";

new TypeIt(".home__title--strong", {
  loop: true,
  speed: 100,
}) // Dream Coder|
  .move(null, { to: "END" })
  .pause(1000)
  .delete()
  .type("Web-designer")
  .pause(1000)
  .delete(8)
  .type("planner")
  .pause(1000)
  .delete()
  .go();
