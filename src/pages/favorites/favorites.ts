import {Component} from '@angular/core';
import {QuotesService} from "../../services/quotes";
import {Quote} from "../../data/quote.interface";
import {ModalController} from "ionic-angular";
import {QuotePage} from "../quote/quote";
import {SettingsService} from "../../services/settings";

@Component({
    selector: 'page-favorites',
    templateUrl: 'favorites.html',
})
export class FavoritesPage {
    quotes: Quote[];

    constructor(
        private quoteServices: QuotesService,
        private modalctrl: ModalController,
        private settingService: SettingsService) {
    }

    ionViewWillEnter() {
        this.quotes = this.quoteServices.getFavoriteQuotes();
    }

    onViewQuote(quote: Quote) {
        const modal =this.modalctrl.create(QuotePage, quote);
        modal.present();
        modal.onDidDismiss((remove: boolean) => {
            if (remove) {
                this.onRemoveFromFavorites(quote);
            }
        });
    }

    onRemoveFromFavorites(quote: Quote) {
        this.quoteServices.removeQuoteFromFavorites(quote);
        const position = this.quotes.findIndex((quoteEl: Quote) =>{
            return quoteEl.id == quote.id;
        });
        this.quotes.splice(position, 1);
    }

    getBackground() {
        return this.settingService.isAltBackground() ? 'altQuoteBackground' : 'quoteBackground';
    }

    isAltBackground() {
        return this.settingService.isAltBackground();
    }


}
