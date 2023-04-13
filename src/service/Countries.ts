import { AxiosInstance } from "axios";

class Countries {
  api: AxiosInstance;
  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async getRegions() {
    const { data } = await this.api.get<{ region: string }[]>(
      "all?fields=region"
    );
    const regions: string[] = [];

    data.forEach((region) => {
      if (!regions.includes(region.region)) {
        regions.push(region.region);
      }
    });

    return regions;
  }

  async getCountriesByRegion(region: string) {
    const { data } = await this.api.get(`region/${region}`);

    console.log(data);
  }

  async getCountriesByName(query: string) {
    const { data } = await this.api.get(`name/${query}`);

    console.log(data);
  }
}

export default Countries;
