import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';

@Injectable()
export class DynamicService {
   private rootViewContainer: ViewContainerRef;
   private component: ComponentRef<{}>;

   constructor(private factoryResolver: ComponentFactoryResolver) { }

   addComponent(viewContainerRef: ViewContainerRef, dynamicComponentClass, clear?: boolean): ComponentRef<{}> {
      if (clear && this.rootViewContainer) {
         this.rootViewContainer.clear();
      }
      
      this.setRootViewContainerRef(viewContainerRef);
      this.addDynamicComponent(dynamicComponentClass);
      return this.component;
   }

   private setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
      this.rootViewContainer = viewContainerRef;
   }

   private addDynamicComponent(dynamicComponentClass) {
      const factory = this.factoryResolver
         .resolveComponentFactory(dynamicComponentClass);
      this.component = factory
           .create(this.rootViewContainer.parentInjector);
      this.rootViewContainer.insert(this.component.hostView);
   }
}
