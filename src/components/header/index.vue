<template>
	<div id="appHeader">

	    <div class="logo header-item">
	    	LOGO
	    </div>

	    <div class="header-item">
		    <div class="inner-header-item">
		       CHARTS
		    </div>

		    <div class="inner-header-item">
		       SPARINGS
		    </div>

		    <div class="menu">
		        <span class="menu-icon color-primary" v-on:click="toggleMenu">
		        	<i class="fas fa-bars fa-3x"></i>
		        </span>
		    </div>
	    </div>

	    <div class="menu-dropdown" v-if="menuOpen">
	    	<div class="menu-dropdown-item color-primary">
	        	<i class="fas fa-cog fa-2x padding-right"></i>
	        	<span class="item-label">{{ labels.settings }}</span>
	     	</div>

	     	<div class="menu-dropdown-item color-primary">
	        	<i class="far fa-question-circle fa-2x padding-right"></i>
	        	<span class="item-label">{{ labels.helpCenter }}</span>
	     	</div>
	    </div>

    </div>
</template>

<script>

export default {
  name: "app-header",
  data() {
    return {
      labels: {
        settings: "Settings",
        helpCenter: "Help center"
      },
      menuOpen: false,
    }
  },
  methods: {
      toggleMenu() {
        this.menuOpen = !this.menuOpen;
      }
    }
  }
</script>

<style>
  #appHeader {
    width: 100%;
    height: 70px;
    background-color: #fce77d;
    font-family: "Dosis", sans-serif;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .color-primary {
    color: #f96167;
  }
  .color-secondary {
    color: #fce77d;
  }
  .header-item {
    display: inline-flex;
    color: #f96167;
    justify-content: space-between;
    align-items: center;
  }
  .inner-header-item {
  	font-size: 30px;
	padding: 1rem 2rem;
  }
  .inner-header-item:hover {
  	background-color: #f96167;
  	color: #fce77d;
  }
  .logo {
  	font-size: 30px;
  	margin-left: 30px; 
  }
  .menu {
    font-size: unset;
  }
  .menu-icon {
  	display: inline-flex;
  	font-size: unset;
  	padding: 1rem 2rem; 
    cursor: pointer;
  }
  .menu-icon:hover {
  	color: #fce77d;
  	background-color: #f96167;
  }
  .menu-dropdown {
    background-color: #ffffff;
    width: 180px;
    border: 1px solid #f2f2f2;
    box-shadow: 5px 5px 10px #f2f2f2;
    border-radius: 5px;
    padding: 1rem;
    position: absolute;
    right: 2rem;
    top: 4.5rem;
    /*transition: all 4s ease-in-out;
    transform-origin: left top;
  	transform: scaleY(0);*/
  }
  /*.menu-icon:active .menu-dropdown {
    transform: translateY(-2em);
    transition: all 3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 0s linear 0.01s;
  }*/
  .menu-dropdown-item {
    padding-bottom: 0.5rem;
  }
  i {
    vertical-align: baseline;
  }
  .padding-right {
    padding-right: .5rem;
  }
  .item-label {
    font-size: 20px;
    vertical-align: baseline;
  }

</style>
