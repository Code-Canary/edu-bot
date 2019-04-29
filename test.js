const assert = require('assert');
const htmlFormatter = require('./render/html-formatter')

const testRawContent = `
<html>
    <p>$shortTextPlaceholder$</p>
    <b>$numberPlaceholder$</b>
    <i>$emptyPlaceholder$</i>
    <u>$undefinedPlaceholder$</u>
    <div style="color: $nullPlaceholder$"></div>
    <span>$longTextPlaceholder$</span>
</html>
`;
const formattedContent = `
<html>
    <p>My name is Elvis</p>
    <b>5</b>
    <i></i>
    <u></u>
    <div style="color: "></div>
    <span>Lorem ipsum pisum masum apsium thatsum</span>
</html>
`;

it('should replace all specifed all placeholders with values and remove nulls', () => {
  const returnValue = htmlFormatter.getFormattedContent(
    testRawContent,
    {
      "shortTextPlaceholder": "My name is Elvis",
      "numberPlaceholder": 5,
      "emptyPlaceholder": "",
      "nullPlaceholder": null,
      // undefined placeholder is well, undefined "undefinedPlaceholder": undefined
      "longTextPlaceholder": "Lorem ipsum pisum masum apsium thatsum"
    }
  );
  
  assert.equal(returnValue, formattedContent)
})