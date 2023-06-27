import { Emails, KoreanAdjectives, KoreanName, KoreanProducts } from '.';

/**
 * @author dhkehd2
 */
enum AdjectiveEnum {
  ALL = 'all',
  NEGATIVE = 'negative',
  POSITIVE = 'positive',
}

export class BongFaker {
  public static fullName(): string {
    const lastName =
      KoreanName.LAST_NAME[
        Math.floor(Math.random() * KoreanName.LAST_NAME.length)
      ];
    const firstName1 =
      KoreanName.FIRST_NAME_1[
        Math.floor(Math.random() * KoreanName.FIRST_NAME_1.length)
      ];
    const firstName2 =
      KoreanName.FIRST_NAME_2[
        Math.floor(Math.random() * KoreanName.FIRST_NAME_2.length)
      ];
    const firstName = firstName1 + firstName2;
    return lastName + firstName;
  }

  public static adjective(type: string = 'all'): string {
    let adjectiveArr = [];
    switch (type) {
      case AdjectiveEnum.NEGATIVE:
        adjectiveArr = KoreanAdjectives.koreanNegativeAdjectives;
        break;
      case AdjectiveEnum.POSITIVE:
        adjectiveArr = KoreanAdjectives.koreanPositiveAdjectives;
        break;
      default:
        adjectiveArr = [
          ...KoreanAdjectives.koreanNegativeAdjectives,
          ...KoreanAdjectives.koreanPositiveAdjectives,
        ];
        break;
    }
    const adjective =
      adjectiveArr[Math.floor(Math.random() * adjectiveArr.length)];
    return adjective;
  }

  public static englishId(digitCount: number = 3) {
    let sampleIdArr = [...Emails.idSample];
    const newId = sampleIdArr[Math.floor(Math.random() * sampleIdArr.length)];
    const number = BongFaker.number(digitCount);
    return newId + number;
  }

  public static email(englishId: string = '') {
    let newId = '';
    if (!englishId) {
      newId = BongFaker.englishId();
    } else {
      newId = englishId;
    }
    let sampleDomainArr = [...Emails.emailDomain];
    const domain =
      sampleDomainArr[Math.floor(Math.random() * sampleDomainArr.length)];
    return newId + domain;
  }

  public static product() {
    let productArr = [
      ...KoreanProducts.fashionItems,
      ...KoreanProducts.homeAppliances,
      ...KoreanProducts.furniture,
    ];
    const product = productArr[Math.floor(Math.random() * productArr.length)];

    let adjectiveArr = [
      ...KoreanAdjectives.koreanNegativeAdjectives,
      ...KoreanAdjectives.koreanPositiveAdjectives,
    ];
    const adjective =
      adjectiveArr[Math.floor(Math.random() * adjectiveArr.length)];
    return `${adjective} ${product}`;
  }

  public static number(digitCount: number): number;
  public static number(minDigitCount: number, maxDigitCount: number): number;
  public static number(
    digitCountOrMinDigitCount: number,
    maxDigitCount?: number,
  ): number {
    let min;
    let max;
    let digitCount;
    if (typeof maxDigitCount === 'undefined') {
      digitCount = digitCountOrMinDigitCount;
      min = 0;
      max = 10 ** digitCount - 1;
    } else {
      digitCount = digitCountOrMinDigitCount;
      min = 10 ** (digitCount - 1);
      max = 10 ** maxDigitCount - 1;
    }
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }

  public static clearPrice(digitCount: number): number;
  public static clearPrice(
    minDigitCount: number,
    maxDigitCount: number,
  ): number;
  public static clearPrice(
    digitCountOrMinDigitCount: number,
    maxDigitCount?: number,
  ): number {
    let min;
    let max;
    let digitCount;
    if (typeof maxDigitCount === 'undefined') {
      digitCount = digitCountOrMinDigitCount;
      min = 0;
      max = 10 ** digitCount - 1;
    } else {
      digitCount = digitCountOrMinDigitCount;
      min = 10 ** (digitCount - 1);
      max = 10 ** maxDigitCount - 1;
    }
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomNumber = parseInt(this.createZeroFill(randomNumber));
    return randomNumber;
  }

  private static createZeroFill(number: number): string {
    if (number === 0) {
      return '0';
    }
    const absoluteNumber = Math.abs(number);
    const firstDigit = Math.floor(
      absoluteNumber / 10 ** Math.floor(Math.log10(absoluteNumber)),
    );
    let zeroFilledString = firstDigit.toString();
    zeroFilledString += '0'.repeat(Math.floor(Math.log10(absoluteNumber)));
    return zeroFilledString;
  }
}
