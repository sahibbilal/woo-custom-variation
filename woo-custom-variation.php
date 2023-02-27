<?php
/**
 * Plugin Name: Woo Custom Variations
 * Plugin URI: 
 * Description: This Plugin is being used to create custom sidebar on woo product page to show product variation in sidebar
 * Version: 1.0.0
 * Author: Sahib Bilal
 * Author URI: 
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
    die;
}
if ( ! defined( 'WP_AUTO_UPDATE_CORE' ) ) {
    define( 'WP_AUTO_UPDATE_CORE', true );
}

/**
 *plugin version.
 */
define( 'WCV_version', '2.0.5' );
/**
 * Plugin activator function
 */
function activate_wcv() {
    require_once plugin_dir_path( __FILE__ ) . 'includes/class-wcv-activator.php';
    WCV_Activator::activate();
}

/**
 *Plugin deactivator function
 */
function deactivate_wcv() {
    require_once plugin_dir_path( __FILE__ ) . 'includes/class-wcv-deactivator.php';
    WCV_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_wcv' );
register_deactivation_hook( __FILE__, 'deactivate_wcv' );

require plugin_dir_path( __FILE__ ) . 'includes/class-wcv.php';

/**
 * Start plugin's execution.
 *
 */
function run_wcv_max() {

    $main = new wcv();
    $main->max_run();
}
run_wcv_max();