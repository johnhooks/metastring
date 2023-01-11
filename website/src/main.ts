/* eslint-disable @typescript-eslint/no-non-null-assertion */

import hello from "parse-meta";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = /* html */ `
  <div>
    <p>Hello <code>parse-meta</code></p>
  </div>
`;

hello();
