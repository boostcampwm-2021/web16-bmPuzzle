const completeAnimation = (project: any) => {
  const completeLetter = new project.PointText({
    point: project.view.center,
    justification: "center",
    content: "Complete!",
    fontWeight: "bold",
    fillColor: "blue",
    fontSize: 50,
  });
  const confetti_circle = new project.Path.Circle({
    center: project.view.center,
    radius: 10,
    fillColor: "#ff7f7f",
  });
  const confetti_star = new project.Path.Star({
    center: project.view.center,
    points: 5,
    radius1: 6,
    radius2: 12,
    fillColor: "#cb9ffd",
  });
  const confetti_arc = new project.Path.Arc({
    from: [0, 0],
    through: [3, 8],
    to: [8, 8],
    strokeWidth: 10,
    strokeColor: "#a9e1ed",
  });
  const confetti_line = new project.Path.Line({
    from: [0, 0],
    to: [7, 7],
    strokeWidth: 5,
    strokeColor: "#ffee58",
  });
  const red_circle = new project.SymbolDefinition(confetti_circle);
  const purple_star = new project.SymbolDefinition(confetti_star);
  const blue_arc = new project.SymbolDefinition(confetti_arc);
  const yellow_line = new project.SymbolDefinition(confetti_line);
  const confettis = [red_circle, purple_star, blue_arc, yellow_line];

  const confettiItems: any[] = [];

  for (let i = 0; i < 250; i++) {
    let instance = new project.SymbolItem(
      confettis[Math.floor(Math.random() * confettis.length)]
    );
    instance.scaling = Math.random() + 0.25;
    instance.position = project.view.center;
    instance.rotation = Math.random() * 180;
    confettiItems.push({
      item: instance,
      directionX: (Math.random() - 0.5) * 20,
      directionY: (Math.random() - 0.5) * 20,
    });
  }
  confettiItems.forEach(({ item, directionX, directionY }) => {
    item.onFrame = (event: any) => {
      item.position.x += directionX;
      item.position.y += directionY;
    };
  });
  project.view.onFrame = () => {
    completeLetter.fillColor.hue += 1;
  };
};

export { completeAnimation };
