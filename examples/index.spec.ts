import { Consoler } from '../src';
new Consoler({
    timestamp: false,
    variant: 'background',
    title: "Global Title"
});

console.log(" ");
console.log(" ");
console.log(" ");
console.log(" ");
console.log(" ");

console.success('Successfully passed!');
console.error('An error occurred!');
console.warn('This is a warning!');
console.info('This is an info message!');

console.success('This is a {b}bold{reset}{c.green} message!{r}', { title: 'Custom Title' });
console.error('This is a {bold}bold and {italic}italic{reset}{c.red} message!{r}', { title: 'Custom Title' });
console.warn('This is a {i}italic{r}{c.yellow}  and {b}bold{r}{c.yellow} message!{r}', { title: 'Custom Title' });
console.info('This is a {i}italic{r}{c.blue}, {b}bold{r}{c.blue} and {italic}{bold}both{reset}{c.blue} message!{r}', { title: 'Custom Title' });
console.info('The time is {tt}!{r}', { title: 'Custom Title' });
console.success('This is a {c.red}red{r}{c.green} message!{r}', { title: 'Custom Title' });
console.error('This is a {c.green}green{reset}{c.red} message and a timestamp!{r}', { title: 'Custom Title', timestamp: true });

console.log(" ");
console.log(" ");
console.log(" ");
console.log(" ");
console.log(" ");

// setTimeout(() => {
//     console.loading(10 * 1000, '{indicator} Loading...', () => {
//         console.success('Loading finished!');
//     }, { title: 'Custom Title' });
// }, 10000);