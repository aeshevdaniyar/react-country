class LocalStorage {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  push(data: any) {
    if (!this.get()) {
      localStorage.setItem(this.name, "[]");
    }

    const countries: any[] = this.get();
    const newC = countries.filter((c) => {
      return c.translations.rus.common != data.translations.rus.common;
    });
    newC.unshift(data);

    localStorage.setItem(this.name, JSON.stringify(newC));
  }

  delete(name: string) {
    const countries: any[] = this.get();

    localStorage.setItem(
      this.name,
      JSON.stringify(
        countries.filter((countrie) => countrie.translations.rus.common != name)
      )
    );
  }

  get() {
    const tmp = localStorage.getItem(this.name);
    if (tmp) {
      return JSON.parse(tmp);
    }
  }
}

export default LocalStorage;
