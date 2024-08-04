declare namespace MathJax {
  interface MathJaxObject {
    typesetPromise?: () => Promise<void>;
  }
}

interface Window {
  MathJax: MathJax.MathJaxObject;
}
