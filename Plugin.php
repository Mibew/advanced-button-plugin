<?php
/*
 * Copyright 2018 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

namespace Mibew\Mibew\Plugin\AdvancedButton;

use Mibew\Asset\Generator\UrlGeneratorInterface as AssetUrlGeneratorInterface;
use Mibew\Database;
use Mibew\EventDispatcher\EventDispatcher;
use Mibew\EventDispatcher\Events;
use Mibew\Thread;

/**
 * Provides an ability to automatically refresh the button and set its
 * visibility depending on chat state.
 */
class Plugin extends \Mibew\Plugin\AbstractPlugin implements \Mibew\Plugin\PluginInterface
{
    protected $initialized = true;

    /**
     * Defines necessary event listener.
     */
    public function run()
    {
        $dispatcher = EventDispatcher::getInstance();
        $dispatcher->attachListener('widgetResponseAlter', $this, 'refreshButton');
    }

    /**
     * Returns verision of the plugin.
     *
     * @return string Plugin's version.
     */
    public static function getVersion()
    {
        return '0.0.1';
    }

    /**
     * Manage the button outlook.
     *
     * @param array $args Event data
     */
    public function refreshButton(&$args)
    {
        $g = $args['asset_url_generator'];
        $args['response']['load']['refresh'] = $g->generate($this->getFilesPath() . '/js/refresh.js', AssetUrlGeneratorInterface::ABSOLUTE_URL);
        $args['response']['handlers'][] = 'refreshButton';
        $args['response']['dependencies']['refreshButton'] = array('refresh');
    }
}
