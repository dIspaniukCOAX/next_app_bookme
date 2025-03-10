abstract class FileSystemComponent {
    abstract getSize(): number;
    abstract getName(): string;
    abstract print(): void;
  }
  
  class CustomFile extends FileSystemComponent {
    private name: string;
    private size: number;
  
    constructor(name: string, size: number) {
      super();
      this.name = name;
      this.size = size;
    }
  
    getSize(): number {
      return this.size;
    }
  
    getName(): string {
      return this.name;
    }
  
    print(): void {
      console.log(`File: ${this.name}, Size: ${this.size}KB`);
    }
  }
  
  class Directory extends FileSystemComponent {
    private name: string;
    private components: FileSystemComponent[] = [];
  
    constructor(name: string) {
      super();
      this.name = name;
    }
  
    add(component: FileSystemComponent): void {
      this.components.push(component);
    }
  
    getSize(): number {
      return this.components.reduce((total, component) => total + component.getSize(), 0);
    }
  
    getName(): string {
      return this.name;
    }
  
    print(): void {
      console.log(`Directory: ${this.name}`);
      this.components.forEach(component => component.print());
    }
  }
  
  const file1 = new CustomFile("file1.txt", 100);
  const file2 = new CustomFile("file2.txt", 200);
  
  const directory1 = new Directory("Directory1");
  const directory2 = new Directory("Directory2");
  
  directory1.add(file1);
  directory2.add(file2);
  
  const rootDirectory = new Directory("RootDirectory");
  rootDirectory.add(directory1);
  rootDirectory.add(directory2);
  
  const file3 = new CustomFile("file3.txt", 50);
  rootDirectory.add(file3);
  
  rootDirectory.print();
  console.log(`Total size of root directory: ${rootDirectory.getSize()}KB`);
  