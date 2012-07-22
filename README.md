#domstream-client

> domstream-client aims provide the same API as [domstream](https://github.com/AndreasMadsen/domstream).
> But it do not implement a HTML parser, instread it depends on the browser DOM.

##Goal

1. Provide the same API as domstream
2. Be small
3. Don't care about speed, the DOM is slow anyway

##Installation

```sheel
npm install domstream-client
```

##Example

```JavaScript
var doc = window.domstream(document);

// find and modify the title
var title = doc.find().only().elem('title')
               .toValue().setContent('new title');
```

## API documentation

Please see [domstream](https://github.com/AndreasMadsen/domstream) for documentation.
The following is not the implemented API but the differences.

### Document

The `Document` object do not support any `ReadStream` interface.

#### document.copy()

This is not supported, sugestions and patches are wellcome.

#### document.live(flag)

Because the real DOM always parse the content when using `HTMLElement.insertAdjacentHTML`
this feature is not supported. But compared to `domstream` the flag is always `true`.

#### document.content

This is not supported, sugestions and patches are wellcome.

#### document.container(list)

This is not supported and it is unlikly it will ever be supported. It is because there
is not stream interface, so it would be a waste of code.

### Search

Search behaves excaltly like it would in `domstream`

### Node

Node behaves almost like it would in `domstream`.

#### node.isSingleton()

A singleton element is one of the following:

```JavaScript
['br', 'col', 'link', 'hr', 'command', 'embed', 'img', 'input', 'meta', 'param', 'source'];
```

Unlike `domstream` it do not care about `/>`.

This list can be acessed and extended by `window.domstream.NO_ENDING_TAG`.

#### node.done()

Doesn't really do anything.

##License

**The software is license under "MIT"**

> Copyright (c) 2012 Andreas Madsen
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.
