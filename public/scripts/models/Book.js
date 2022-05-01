class Book{
    constructor(title, author, rating, imageUrl){
        this.title=title
        this.author = author
        this.rating = rating
        this.imageUrl = imageUrl
        this.isFavorite = false
    }
    render(){
        const componentHtml =
        `
        <div class="book-item">
            <div class="book-item-image">
                <img src="${this.imageUrl}" alt="${this.title}-image">
            </div>
            <div class="book-item-info">
                <div class="book-item-identity">
                    <p class="book-item-identity-title">${this.title}</p>
                </div>
            </div>
        </div>
        `
        return componentHtml
    }
    changeRating(newRating){
        this.rating = newRating
    }
    toggleFavorite(){
        this.isFavorite = !this.isFavorite
    }
}