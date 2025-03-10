interface IRenderer {
  renderCircle(radius: number): void;
  renderRectangle(width: number, height: number): void;
}

class OpenGLRenderer implements IRenderer {
  renderCircle(radius: number): void {
    console.log(`Rendering Circle with radius ${radius} using OpenGL`);
  }

  renderRectangle(width: number, height: number): void {
    console.log(`Rendering Rectangle with width ${width} and height ${height} using OpenGL`);
  }
}

class DirectXRenderer implements IRenderer {
  renderCircle(radius: number): void {
    console.log(`Rendering Circle with radius ${radius} using DirectX`);
  }

  renderRectangle(width: number, height: number): void {
    console.log(`Rendering Rectangle with width ${width} and height ${height} using DirectX`);
  }
}

abstract class Shape {
  protected renderer: IRenderer;

  constructor(renderer: IRenderer) {
    this.renderer = renderer;
  }

  abstract draw(): void;
}

class Circle extends Shape {
  private radius: number;

  constructor(renderer: IRenderer, radius: number) {
    super(renderer);
    this.radius = radius;
  }

  draw(): void {
    this.renderer.renderCircle(this.radius);
  }
}

class Rectangle extends Shape {
  private width: number;
  private height: number;

  constructor(renderer: IRenderer, width: number, height: number) {
    super(renderer);
    this.width = width;
    this.height = height;
  }

  draw(): void {
    this.renderer.renderRectangle(this.width, this.height);
  }
}

function main() {
  const openglRenderer = new OpenGLRenderer();
  const circleWithOpenGL = new Circle(openglRenderer, 5);
  const rectangleWithOpenGL = new Rectangle(openglRenderer, 10, 20);

  circleWithOpenGL.draw();
  rectangleWithOpenGL.draw();

  console.log("---");

  const directXRenderer = new DirectXRenderer();
  const circleWithDirectX = new Circle(directXRenderer, 5);
  const rectangleWithDirectX = new Rectangle(directXRenderer, 10, 20);

  circleWithDirectX.draw();
  rectangleWithDirectX.draw();
}

main();
