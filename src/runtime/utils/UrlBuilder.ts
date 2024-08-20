export class UrlBuilder {
  private url: string
  private isFirst: boolean

  constructor(initialValue: string = '') {
    this.url = initialValue
    this.isFirst = true
  }

  append(key: string, value: string): this {
    if (this.isFirst) {
      this.url += `?${key}=${value}`
      this.isFirst = false
    }
    else {
      this.url += `&${key}=${value}`
    }
    return this
  }

  toString(): string {
    return this.url
  }
}
