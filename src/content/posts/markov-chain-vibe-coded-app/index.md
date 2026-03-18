---
title: 'How (and why) I vibe-coded an app to test Markov chains for image generation'
published: 2025-08-05
draft: false
tags: ['ai', 'javascript', 'machine learning']
toc: true
coverImage:
  src: './markov-generated-image.webp'
  alt: 'Mostly indistinguishable, noisy and colorful image generated with a Markov chain process.'
description: 'Exploring how to build fast applications with modern AI tools. A personal approach.'
---
Some days ago, binge-watching on YouTube, I "found" the latest video from the famous channel [Veritasium](https://www.youtube.com/@veritasium) about the mathematical concept called Markov chains. Of course, its catchy (clickbait) title, [The Strange Math That Predicts (Almost) Anything](https://www.youtube.com/watch?v=KZeIEiBrT_w), engaged me immediately. After half an hour engaged by its storytelling and well produced content, I wanted to test the concepts exposed there.

I must admit that I believed that, before watching that video, I understood what is a Markov chain. Wrong. The simplicity of the math behind left me surprised and fully motivated to experiment in a field that I always find exciting: image manipulation.

## A proof of concept

Initially, I wanted to iterate on a simple command-line method that produces a sequence of characters that can be used as "pixels". ASCII characters came to help: `[' ', '░', '▒', '▓', '█', '▄', '▀']`. Now, with probabilities matrix, the work here is only iterate over a given number of steps and, with a random seed, check the probability of an ocurrency:

```javascript
function markov(steps = 1000) {
    const states = [' ', '░', '▒', '▓', '█', '▄', '▀'];
    const transitionProbabilities = {
        [states[0]]: { [states[0]]: 0.9, [states[1]]: 0.0, [states[2]]: 0.0, [states[3]]: 0.0, [states[4]]: 0.1, [states[5]]: 0.0, [states[6]]: 0.0 },
        [states[1]]: { [states[0]]: 0.1, [states[1]]: 0.9, [states[2]]: 0.0, [states[3]]: 0.0, [states[4]]: 0.9 , [states[5]]: 0.0, [states[6]]: 0.9 },
        [states[2]]: { [states[0]]: 0.0, [states[1]]: 0.1, [states[2]]: 0.9, [states[3]]: 0.0, [states[4]]: 0.0 , [states[5]]: 0.1, [states[6]]: 0.0 },
        [states[3]]: { [states[0]]: 0.0, [states[1]]: 0.0, [states[2]]: 0.1, [states[3]]: 0.9, [states[4]]: 0.1 , [states[5]]: 0.1, [states[6]]: 0.0 },
        [states[4]]: { [states[0]]: 0.0, [states[1]]: 0.0, [states[2]]: 0.0, [states[3]]: 0.0, [states[4]]: 0.0 , [states[5]]: 0.1, [states[6]]: 0.1},
        [states[5]]: { [states[0]]: 0.1, [states[1]]: 0.0, [states[2]]: 0.0, [states[3]]: 0.9, [states[4]]: 0.0 , [states[5]]: 0.1, [states[6]]: 0.0},
        [states[6]]: { [states[0]]: 0.0, [states[1]]: 0.1, [states[2]]: 0.0, [states[3]]: 0.0, [states[4]]: 0.1 , [states[5]]: 0.0, [states[6]]: 0.1},
    }

    let currentState = states[4];
    let accumulator = currentState;

    while (steps > 0) {
        const nextState = states[Math.floor(Math.random() * states.length)];
        const probability = transitionProbabilities[currentState][nextState];
        if (Math.random() < probability) {
            if (steps % 90 === 0) {
                accumulator += '\n';
            }
            currentState = nextState;
            accumulator += currentState;
            steps--;
        }
    }

    return accumulator;
}
```
The result? A promising nice pattern like this one:

![Pattern from Markov chain #pixelated](./naivemarkovimage.webp 'Output pattern from the Markov chain generator')

## Learning (machines)

But, the interesting part of Markov chains is their ability to learn from previous sources. In the previous example, the `transitionsProbabilities` matrix was deliberated, tunned manually to obtain similar patterns. What does it means? We need to provide a way to build or calculate that matrix from an initial source. A new method must be introduced to perform that calculations. Additionally, it required to evaluate the probabilities from an external image or a set of images.

As the previous example showed, we have a limited set of "colors", 7 in total. Reducing the number of colors of the source image will improve the speed of processing and creation of the output image.

The final matrix will be a simplified representation of the current image, keeping the general structure and probabilities of the original image.

I wanted an interactive application that can be deployed in any static server: basic HTML, JavaScript and CSS.

This list of restictions will be a good starting point to develop a more robust solution, but requires going deeper in the following aspects:

- Image manipulation using the Canvas API.
- Color reduction algorithm.
- Markov chains learning algorithm.

## Vibe prompting

As something that I wanted to explore quick, I decided to use some generative AI to create this app faster. But as many knows, a good prompt is the key of a good result. Why not use the same tool to create a well documented set of instructions to generate the expected application? Using [Gemini](https://gemini.google.com/) 2.5 flash, I asked for:

> write a detailed document that instructs an AI to develop an application in javascript that, using the Markov chains concept, learns from a set of base images, subscaling and reducing their colors to a user defined total. Then, with the obtained probabilities, generates a new image

The result: an impressive and highly detailed, a thousand words long document that details the requirements of this application: [ai-instructions.md](https://github.com/manuelhe/markov-image-generator/blob/main/ai-instructions.md). It went way beyond my expectations, describing the HTML document, a general requirement for the styles, and the structure of the JavaScript file. But it makes a strong emphasis describing the inner process of the application split in three sections:

1. Image Preprocessing (Subscaling and Color Reduction)
2. Markov Chain Learning
3. Image Generation

Each step has a brief description and a set of instructions for the AI, e.g.,

>    **Objective**: Implement the logic to load images, resize them, and reduce their color palette to a user-defined number of colors.
<br>**Instructions for AI**:
<br>1. Image Loading and Subscaling (`processImages` function):
<br>- When the "Process Images & Learn" button is clicked, iterate through the selected files from the file input...

Some instructions offers different alternatives, but makes a final decision at the end,

> **Pixel Traversal**: For each image, traverse its pixels. Consider different neighborhood relationships for the Markov chain:
<br>- **Option 1 (Simple - 1D)**: Learn probabilities based on a pixel and its right neighbor (`(x,y)` to `(x+1,y)`). This is simpler but might produce less cohesive images.
<br>- **Option 2 (Slightly More Complex - 2D)**: Learn probabilities based on a pixel and its right neighbor AND its bottom neighbor (`(x,y)` to `(x+1,y)` and `(x,y)` to `(x,y+1)`). This generally produces better results.
<br>- **AI Choice**: Implement Option 2 for a more robust model.

or simply mention other possible solutions,

> **Recommended Algorithm**: Use a K-means clustering algorithm or a similar perceptual color reduction method (e.g., Octree Quantization if simpler to implement in JS).

In other sections, it even presents code suggestions:

>  The structure of markovChainModel should be,

```JavaScript
{
    "color1": {
        "next_color_1": probability,
        "next_color_2": probability,
        // ...
    },
    "color2": {
        // ...
    }
}
```

or describes an algorith to solve a particular problem,

> **Counting Transitions**:
<br>- For each pixel `P1` at `(x,y)`:
<br> - Get its color `C1`.
<br> - Get the color `C2` of its right neighbor `P2` at `(x+1,y)` (if within bounds).
<br> - Get the color `C3` of its bottom neighbor `P3` at `(x,y+1)` (if within bounds).
<br> - Increment counts in `markovChainModel`:
<br> - `markovChainModel[C1][C2]` (for horizontal transitions)
<br> - `markovChainModel[C1][C3]` (for vertical transitions)
<br>- Handle edge cases (last row/column pixels).

On a following step, called *Refinements and Error Handling*, it makes some suggestions related with the user interface, like *Input Validation* or *User Feedback*. Others related with the *Performance Considerations* and *Visual Quality Enhancements*. It even dedicate a section to the *Code Structure*.

Finally, a list of deliverables where, alongside the item, it presents a really brief description of each file. Another deliverable suggested is a documentation (it doesn´t specify an output format), highlighting the use instructions, the technical details behind the Markov chain implementation, and possible limitations of the app.

## Vibe coding

Using the **Canvas** option enabled in the Gemini web interface, I asked to build the solution:

> Using the previous response, generate the described application

Well, after a short wait, I got this,

> I have created the Markov Chain Image Generation application you described. Below are the complete, self-contained files for the application. You can save these three files (`index.html`, `style.css`, and `script.js`) in the same folder and open `index.html` in your web browser to run the application.

followed by three files ready to be downloaded. The **Canvas** option in the Gemini UI, allows the live previsualization of web applications.

### Mixed results

The first iteration returned an almost unusable application, with missing links to the correct Tailwind styles and broken JavaScript methods. after aking to fix it, it came with a decent result that,at the end required manual tweaking in most of its parts.

Here you can experiment with the manually edited result: [Markov Image Generator ](https://morra.co/markov-image-generator/).

## Conclusions

This is a promising technology that will transform in less than a year the way software is developed. Engineers will need a new set of skills required to orchestrate autonomous workers, understanding problems in a macro perspective, know how to write tailored instructions, and be aware of the limitations of the current tools.

Great times will come, scary but thrilling times!