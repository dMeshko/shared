import { Component, OnInit, OnDestroy, Input, ViewEncapsulation } from '@angular/core';
import { ANIMATION_TYPES } from 'ngx-loading';
import { Subscription } from 'rxjs/internal/Subscription';
import { IqLoadingService, ILoadingState } from './iq-loading.service';

@Component({
    selector: 'iq-loading-spinner',
    template: `<ngx-loading [show]="show" [config]="config"></ngx-loading>`,
    styles: [
        `.backdrop{
        background-color: initial !important;
    }

    .spinner-three-bounce {
        width: auto !important;
        position: fixed !important;
     }

     .spinner-three-bounce > div {
       margin: 0 5px;
     }`
    ],
    encapsulation: ViewEncapsulation.None
})
export class IqLoadingSpinnerComponent implements OnInit, OnDestroy {
    @Input() show: boolean;
    config: ILoadingSpinnerConfig;

    private subscription: Subscription;

    constructor(private loadingService: IqLoadingService) { }

    ngOnInit() {
        this.config = {
            animationType: ANIMATION_TYPES.threeBounce,
            primaryColour: "rgb(249,127,63)",
            secondaryColour: "rgb(249,127,63)",
            tertiaryColour: "rgb(249,127,63)"
        };

        this.subscription = this.loadingService.loaderState
            .subscribe((state: ILoadingState) => {
                this.show = state.show;
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

/**
 * @member {animationType} The animation to be used within ngx-loading. Use the ANIMATION_TYPES constant to select valid options.
 * @member {backdropBorderRadius} The border-radius to be applied to the ngx-loading backdrop, e.g. '14px'.
 * @member {backdropBackgroundColour} The background-color to be applied to the ngx-loading backdrop, e.g. 'rgba(255, 255, 255, 0.2)'.
 * @member {fullScreenBackdrop} Set to true to make the backdrop full screen, with the loading animation centered in the middle of the screen.
 * @member {primaryColour} The primary colour, which will be applied to the ngx-loading animation.
 * @member {secondaryColour} The secondary colour, which will be applied to the ngx-loading animation (where appropriate).
 * @member {tertiaryColour} The tertiary colour, which will be applied to the ngx-loading animation (where appropriate).
 */
interface ILoadingSpinnerConfig {
    animationType?: string;
    backdropBorderRadius?: string;
    backdropBackgroundColour?: string;
    fullScreenBackdrop?: string;
    primaryColour?: string;
    secondaryColour?: string;
    tertiaryColour?: string;
}
